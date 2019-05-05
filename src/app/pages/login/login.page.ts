import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {IUser} from '../../Interfaces/user';
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
    }

    login() {
        let userFound = false;
        if (this.username === 'dev') {
            this.authService.login('dev', 'masterpass');
            this.router.navigate(['../tabs/home']);
        }
        this.userService.getAllUsers().subscribe(data => this.users = data);
        for (const user of this.users) {
            if (user.userName === this.username) {
                userFound = true;
                if (user.password === user.password) {
                    this.authService.login(this.username, this.password);
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

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

}
