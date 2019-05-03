import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    authenticated = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getUserSubject().subscribe(authState => {
            this.authenticated = authState ? true : false;
        });
    }

    goBackToMenu() {
        this.router.navigate(['menu']);

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    changePassword() {
        this.router.navigate(['change-password']);
        this.authService.currentUser.value.userName.toString();


    }
}
