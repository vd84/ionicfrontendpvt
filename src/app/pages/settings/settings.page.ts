import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
})
export class SettingsPage implements OnInit {


    constructor(private router: Router,
                private nativeStorage: NativeStorage,
                public loadingController: LoadingController,
                private userService: UserService,
    ) {
    }


    changePassword() {
        this.router.navigate(['change-password']);


    }

    deleteAccount() {
        this.router.navigate(['delete-account']);


    }

    logout() {
        this.userService.logout();
        this.router.navigate(['login']);
    }

    ngOnInit(): void {
    }
}
