import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {ActivityService} from '../../services/activity-service/activity.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
})
export class HomePage {

    constructor(private router: Router, private userService: UserService, private activityService: ActivityService) {
    }

    ionViewDidEnter() {
        this.activityService.getAllActivities();
    }

    ionViewDidLeave() {



        this.activityService.getAllActivities();

    }


    onClick() {
        console.log('Activity clicked');
    }

    openYouthCenter() {
        this.router.navigate(['location']);
    }

}
