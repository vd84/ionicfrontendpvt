import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {

    constructor(private router: Router, private userservice: UserService) {
    }

    ngOnInit() {
    }

    goToSettings() {

        this.router.navigateByUrl('settings');

    }
}
