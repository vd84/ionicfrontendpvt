import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {

    username: string;
    password: string;
    currentyouthcentre: number;

    users: any;
    isLoggedIn: boolean;
    isfacebookUser: number;


    constructor(private router: Router,
                private userService: UserService,
                public toastController: ToastController,
                private fb: Facebook,
                private nativeStorage: NativeStorage,
                public loadingController: LoadingController,
                private platform: Platform,
                public alertController: AlertController
    ) {
    }

    ngOnInit() {
    }


    async doFbLogin() {
        // create loader and show until process is done
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        this.presentLoading(loading);

        // the permissions your facebook app needs from the user
        const permissions = ['public_profile', 'email'];

        this.fb.login(permissions)
            .then(response => {
                let userId = response.authResponse.userID;
                // Getting name and email properties

                this.fb.api('/me?fields=name,email', permissions)
                    .then(user => {
                        user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                        // now we have the users info, we save it to nativestorage on the device
                        this.nativeStorage.setItem('facebook_user',
                            {
                                name: user.name,
                                email: user.email,
                                picture: user.picture
                            })
                            .then(() => {

                                this.userService.submitUser(user.email, user.name, 'fbpass1', this.currentyouthcentre, 1);


                                loading.dismiss();


                            }, error => {
                                console.log(error);
                                loading.dismiss();
                            });
                    });
            }, error => {
                // cordova not available on current device
                console.log(error);
                if (!this.platform.is('cordova')) {
                    this.presentAlert();
                }
                loading.dismiss();
            });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentLoading(loading) {
        return await loading.present();
    }

    newLogin() {
        this.userService.login(this.username, this.password, 0);
    }

    createProfile() {
        this.router.navigate(['register']);
    }

    forgotPassword() {
        this.router.navigate(['reset-password']);
    }

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

}
