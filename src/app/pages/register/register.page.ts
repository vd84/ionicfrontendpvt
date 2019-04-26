import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    private username: string;
    private password: string;
    private email: string;

    constructor(private router: Router, public toastController: ToastController) {
    }

    ngOnInit() {
    }

    createProfile() {
        if (this.username === 'avail' && this.password === 'avail' && this.email === 'avail') {
            this.presentToast('Profile created');
            this.router.navigate(['/tabs/home']);
        } else if (this.username === 'taken' && this.password === 'taken' && this.email === 'taken') {
            this.presentToast('Profile already exists');
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
