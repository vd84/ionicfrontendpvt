import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {HelloService} from '../../services/hello.service';
import {Form, NgForm} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    private username: string;
    private password: string;
    private youthcentre: number;
    private email: string;
    private users = [];

    constructor(private router: Router, public toastController: ToastController, private userService: UserService, private helloService: HelloService) {
    }

    ngOnInit() {
    }

    createProfile() {
        this.userService.getAllUsers().subscribe(data => this.users = data);
        let taken = false;
        for (const user of this.users) {
            if (user.username.toString() === this.username) {
                taken = true;
            }
        }
        if (taken) {
            this.presentToast('Profile already exists');
        } else {
            this.createUserAndPost();
            this.presentToast('Profile created');
            this.router.navigate(['home']);
        }
    }

    createUserAndPost() {

        this.userService.submitUser(this.username, this.password, this.youthcentre);


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

    register(form: NgForm) {
    }

    goBackToMenu() {
        this.router.navigate(['/home']);
    }
}
