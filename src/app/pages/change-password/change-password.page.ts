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
    private repeatedPassword: string;
    private newPassword: string;


    constructor(private router: Router, public toastController: ToastController, private userService: UserService) {
    }

    ngOnInit() {
    }

    changePassword() {

        // här måste även gamla lösenordet skickas in, görs inte nu

        this.userService.changePassword(this.newPassword);


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
