import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {Form, NgForm} from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
})
export class RegisterPage implements OnInit {

    private username: string;
    private password: string;
    private currentyouthcentre: number;
    private email: string;
    private displayname;
    private users = [];


    constructor(private router: Router, public toastController: ToastController, private userService: UserService) {
    }

    ngOnInit() {
    }



    createUserAndPost() {

        this.userService.submitUser(this.username, this.displayname, this.password, this.currentyouthcentre, false);


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
