import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    constructor(private router: Router) {}

    onClick() {
        console.log('Activity clicked');
    }
    openYouthCenter() {
        this.router.navigate(['location']);
    }

}
