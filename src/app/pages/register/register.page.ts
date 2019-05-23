import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {Form, NgForm} from '@angular/forms';
import {YouthcenterService} from '../../services/youthcenter.service';


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
    private youthCentres = [];


    constructor(private router: Router, public toastController: ToastController, private userService: UserService, private youthcentreService: YouthcenterService) {
    }

    ngOnInit() {

        this.youthcentreService.getAllLocations();
        this.youthCentres = this.youthcentreService.allYouthCentres;
        setTimeout(() => {
            this.youthcentreService.getAllLocations();
            this.youthCentres = this.youthcentreService.allYouthCentres;
        }, 2000);
    }
    loadallyouthcenters() {
        this.youthcentreService.getAllLocations();
        this.youthCentres = this.youthcentreService.allYouthCentres;
    }




    createUserAndPost() {
        console.log(this.currentyouthcentre);

        this.userService.submitUser(this.username, this.displayname, this.password, this.currentyouthcentre, 0);


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
