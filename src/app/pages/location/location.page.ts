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
    allActivitiesForCenter = [];

    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService, private activityService: ActivityService, private dataService: DataService, private router: Router) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['youthcentre']) {
            this.youthcentre = this.route.snapshot.data['youthcentre'];
            console.log(this.youthcentre);
        } else {
            this.youthcentre = new Youthcentre(9000, null, null, null, null, 'CENTERNOTDEFINED', null);
            console.log('Inte rätt');
        }
        this.user = this.userService.currentUser;
        this.getActivitiesForYouthCenter();
        console.log(this.allActivitiesForCenter);
        console.log(this.allActivitiesForCenter.length);


    }
    checkin () {

        console.log('youthcentreid ' + this.youthcentre.id);
        console.log('userid ' + this.user.id);
        this.checkinService.youthcentreCheckin(this.user.id,  this.youthcentre.id);
    }
/*    loadEvent(activity) {
        this.dataService.setData('activity', activity);
        this.router.navigateByUrl('/specific-event/activity');
    }*/

    getActivitiesForYouthCenter() {
        this.activityService.getYouthCenterActivities(this.youthcentre.id).subscribe( data => {
            this.allActivitiesForCenter = data;
        });
    }
    loadEvent(activity) {
        this.dataService.setData('activity', activity);
        this.router.navigateByUrl('/specific-event/activity');
    }


}
