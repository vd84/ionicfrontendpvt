import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    private username: string;
    private password: string;
    private email: string;
    private users = [];

    constructor(private router: Router, public toastController: ToastController, private userService: UserService) {
    }

    ngOnInit() {
    }

    createProfile() {
        let taken = false;
        for (const user of this.users) {
            console.log(user.name);
            if (user.name === this.username) {
                taken = true;
            }
        }
        if (taken) {
            this.presentToast('Profile already exists');
        } else {
            this.presentToast('Profile created');
            this.router.navigate(['/tabs/home']);
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

    getUsers() {
        this.userService.getAllUsers().subscribe(data => this.users = data);
    }

}
