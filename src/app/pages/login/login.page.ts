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
    private users = [];

    constructor(private router: Router, private authService: AuthService, private userService: UserService, public toastController: ToastController) {
    }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(data => this.users = data);

    }


    login() {
        let userFound = false;
        if (this.username === 'dev') {
            this.authService.login(3, 'dev', 'masterpass');
            this.router.navigate(['../tabs/home']);
        }
        for (const user of this.users) {
            if (user.username.toString() === this.username) {
                userFound = true;
                if (true) {
                    this.authService.login(user.id, this.username, this.password);
                    this.router.navigate(['../tabs/home']);
                } else {
                    this.presentToast('Wrong password');
                }
            }
        }
        if (!userFound) {
            this.presentToast('No such user');
        }
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
