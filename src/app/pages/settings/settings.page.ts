import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoadingController} from '@ionic/angular';
import {YouthCenterServiceMock} from '../../../../test-config/mocks-ionic';
import {YouthcenterService} from '../../services/youthcenter.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
})
export class SettingsPage implements OnInit {

    youthcenters = [];
    chosenYouthCentre;


    constructor(private router: Router,
                private nativeStorage: NativeStorage,
                private userService: UserService,
                private youthcenterService: YouthcenterService
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

        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;

    }

}
