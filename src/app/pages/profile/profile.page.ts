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
    ourId: any;
    currentyouthcentre;
    youthCentres: any;

    constructor(private router: Router, private userservice: UserService, private youthcentreservice: YouthcenterService) {
    }

    ngOnInit() {
        console.log(this.allCentres);

        this.youthcentreservice.getAllLocations();

        setTimeout(() => {
            this.youthcentreservice.getAllLocations();
            this.youthCentres = this.youthCentres.allYouthCentres;
        }, 2000);


        setTimeout(() => {
            this.getMyYouthCentre();

        }, 1000);

    }

    goToSettings() {

        this.router.navigateByUrl('settings');

    }

    getMyYouthCentre() {

        this.ourId = this.youthcentreservice.getTheRightId();
    }

    addYouthCentre() {
        this.userservice.addYouthCentre(this.currentyouthcentre);
    }
}

