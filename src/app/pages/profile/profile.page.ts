import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {YouthcenterService} from '../../services/youthcenter.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {

    allCentres = [];

    constructor(private router: Router, private userservice: UserService, private youthcentreservice: YouthcenterService) {
    }

    ngOnInit() {
        this.youthcentreservice.getAllLocations();

        this.allCentres = this.youthcentreservice.allYouthCentres;
    }

    goToSettings() {

        this.router.navigateByUrl('settings');

    }

    getMyYouthCentre() {

        for (const youthcentre of this.allCentres) {
            if (youthcentre.id === this.userservice.currentUser.currentyouthcentre) {
                return youthcentre.name;
            }
            return 'Du har ingen ungdomsgård';
        }
    }
}
