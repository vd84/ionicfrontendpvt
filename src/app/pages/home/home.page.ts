import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    constructor(private router: Router, private userService: UserService) {}

    onClick() {
        console.log('Activity clicked');
    }
    openYouthCenter() {
        this.router.navigate(['location']);
    }

    ionViewWillEnter() {
        console.log(this.userService.currentUser);
    }
}
