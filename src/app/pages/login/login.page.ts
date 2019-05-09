import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private username: string;
    private password: string;

    constructor(private router: Router, private authService: AuthService, private userService: UserService, public toastController: ToastController) {
    }

    ngOnInit() {


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
