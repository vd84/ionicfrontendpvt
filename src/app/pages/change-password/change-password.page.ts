import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';

import {AuthService} from '../../services/authentication-service/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    private currentPassword: string;
    private repeatedPassword: string;
    private newPassword: string;


    constructor(private router: Router, public toastController: ToastController, private userService: UserService, private authService: AuthService) {
    }

    ngOnInit() {
    }

    changePassword() {


        if (this.currentPassword === this.authService.currentUser.value.password.toString()) {
            if ((this.currentPassword === this.repeatedPassword)) {

                this.userService.modifyUser(this.authService.currentUser.value.name.toString(), this.newPassword);
            } else {

                this.presentToast('Passwords do not match');
            }
        } else {
            this.presentToast('Wrong password');
        }
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
