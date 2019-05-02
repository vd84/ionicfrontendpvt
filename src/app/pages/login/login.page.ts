import {Component, OnInit} from '@angular/core';
import {TabsPage} from '../../tabs/tabs.page';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private username: string;
    private password: string;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.username);
        this.router.navigate(['../tabs/home']);
    }

    createProfile() {
        this.router.navigate(['register']);
    }

}
