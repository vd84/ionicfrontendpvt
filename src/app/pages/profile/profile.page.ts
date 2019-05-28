import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {YouthcenterService} from '../../services/youthcenter.service';
import {BadgeService} from '../../services/badge-service/badge.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {

    allCentres = [];
    ourId: any;
    currentyouthcentre;
    youthCentres = [];
    private allMyBadges = [];
    image;

    constructor(private router: Router, private userservice: UserService, private youthcentreService: YouthcenterService, private badgeservice: BadgeService) {
    }

    ngOnInit() {


    }

    ionViewWillEnter() {
        console.log(this.allCentres);

        this.userservice.getUsersAvatars(this.userservice.currentUser.avatar);


        this.youthcentreService.getAllLocations();
        this.youthCentres = this.youthcentreService.allYouthCentres;
        setTimeout(() => {
            this.youthcentreService.getAllLocations();
            this.youthCentres = this.youthcentreService.allYouthCentres;
        }, 500);

        setTimeout(() => {
            this.getMyYouthCentre();

        }, 200);

        this.displayAllMyBadges();


    }

    goToSettings() {

        this.router.navigateByUrl('settings');

    }

    getMyYouthCentre() {

        this.ourId = this.youthcentreService.getTheRightId(this.userservice.currentUser.currentyouthcentre);
    }


    displayAllMyBadges() {
        this.badgeservice.getAllMyBadges(this.userservice.currentUser.id).subscribe(data => {
            console.log('profilepage ' + ' displayallmybadges');
            this.allMyBadges = data;
        });
    }


    navigateToChoosePicture() {
        this.router.navigateByUrl('choose-picture');
    }


}

