import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {AuthService} from '../../services/authentication-service/auth.service';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.page.html',
    styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
    private username: string;
    private password: string;


    constructor(private alertCtrl: AlertController, private router: Router, public toastController: ToastController, private userService: UserService, private authService: AuthService) {
    }

    ngOnInit() {
    }


    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

    deleteUser() {
        this.userService.deleteUser(this.username, this.password);

    }


}
