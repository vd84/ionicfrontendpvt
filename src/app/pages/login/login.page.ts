import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {User} from '../../Models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private username: string;
    private password: string;
    users: any;
    isLoggedIn: boolean;
    FB_APP_ID = 333689117336019;
    facebookUser;
    private userExists;


    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService,
                public toastController: ToastController,
                private fb: Facebook,
                private nativeStorage: NativeStorage,
                public loadingController: LoadingController,
                public navCtrl: NavController,
                private platform: Platform,
                public alertController: AlertController
    ) {
    }

    ngOnInit() {


    }


    async doFbLogin() {
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
                // Learn more about permissions in https://developers.facebook.com/docs/facebook-login/permissions

                this.fb.api('/me?fields=name,email', permissions)
                    .then(user => {
                        user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                        // now we have the users info, let's save it in the NativeStorage
                        this.nativeStorage.setItem('facebook_user',
                            {
                                name: user.name,
                                email: user.email,
                                picture: user.picture
                            })
                            .then(() => {

                                this.userExists = this.userService.submitUser(user.name, 'fbpass', 1);

                                this.userService.currentUser.picture = user.picture[0].data;


                                loading.dismiss();


                            }, error => {
                                console.log(error);
                                loading.dismiss();
                            });
                    });
            }, error => {
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
        this.userService.login(this.username, this.password);


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
