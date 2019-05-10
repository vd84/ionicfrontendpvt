import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    authenticated = false;

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {

    }

    logout() {
        this.userService.logout();
        this.router.navigate(['login']);
    }

    changePassword() {
        this.router.navigate(['change-password']);


    }

    deleteAccount() {
        this.router.navigate(['delete-account']);


    }
}
