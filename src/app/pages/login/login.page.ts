import {Component, OnInit} from '@angular/core';
import {TabsPage} from '../../tabs/tabs.page';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private username: string;
    private password: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['tabs']);
    }

    createProfile() {
        this.router.navigate(['register']);
    }

}
