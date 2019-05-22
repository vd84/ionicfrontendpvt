import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserService} from '../../services/user-service/user.service';
import {Youthcentre} from '../../Models/youthcentre';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
})
export class LocationPage implements OnInit {

    youthcentre: any;
    user: any;
    allActivitiesForYouthCentreToShow = [];


    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService, private activityService: ActivityService, private dataService: DataService, private router: Router) {
    }

    ngOnInit() {
        this.activityService.getAllActivities();
        if (this.route.snapshot.data['youthcentre']) {
            this.youthcentre = this.route.snapshot.data['youthcentre'];
            console.log(this.youthcentre);
        } else {
            this.youthcentre = new Youthcentre(9000, null, null, null, null, 'CENTERNOTDEFINED', null);
            console.log('Inte rätt');
        }
        this.user = this.userService.currentUser;

        this.generateActvitiesForYouthCentreToShow();


    }

    checkin() {

        console.log('youthcentreid ' + this.youthcentre.id);
        console.log('userid ' + this.user.id);
        this.checkinService.youthcentreCheckin(this.user.id, this.youthcentre.id);
    }

    /*    loadEvent(activity) {
            this.dataService.setData('activity', activity);
            this.router.navigateByUrl('/specific-event/activity');
        }*/


    loadEvent(activity) {
        this.dataService.setData('activity', activity);
        this.router.navigateByUrl('/specific-event/activity');
    }

    generateActvitiesForYouthCentreToShow() {

        for (const activity of this.activityService.allActivities) {
            console.log(activity.challenger + ' challenger');
            console.log(activity.challenged + ' challenged');
            console.log(this.youthcentre.id + ' youthcentre id');
            if (activity.challenger === this.youthcentre.id || activity.challenged === this.youthcentre.id) {
                this.allActivitiesForYouthCentreToShow.push(activity);

            }
        }
    }


    userIsCloseEnough() {
        return localStorage.getItem('isCloseEnough') === 'true';

    }

    userCanCheckIn() {
        if (this.youthcentre.checkedin === 0  && this.userIsCloseEnough() ) {
            this.youthcentre.checkedin = 1;
            return true;
        }
    }
}
