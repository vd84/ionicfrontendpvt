import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
})
export class ChangePasswordPage implements OnInit {
    private currentPassword: string;
    private repeatedNewPassword: string;
    private newPassword: string;
    loginSucceded = false;


    constructor(private router: Router, public toastController: ToastController, private userService: UserService) {
    }

    ngOnInit() {
    }

    changePassword() {

        // här måste även gamla lösenordet skickas in, görs inte nu

        if (this.newPassword !== this.repeatedNewPassword) {
            this.presentToast('Lösenorden matchar inte');
            return;
        }

        this.userService.checkLogin(this.userService.currentUser.name, this.currentPassword, this.userService.currentUser.isfacebookuser).subscribe(
            data => {

                this.loginSucceded = data !== null;

            }
        );

        setTimeout(() => {
            if (this.loginSucceded) {
                this.userService.changePassword(this.newPassword);
                this.presentToast('Ändringen lyckad');

            } else {
                this.presentToast('Fel lösenord, prova igen');

            }

        }, 1000);


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
