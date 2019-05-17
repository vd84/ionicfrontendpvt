import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
})
export class EventPage implements OnInit {
    activity: any;
    allActivities = [];


    constructor(private router: Router, private authService: AuthService, private activityService: ActivityService, private dataService: DataService) {
    }


    ngOnInit() {
        this.activityService.getAllActivities().subscribe(data => this.allActivities = data);
        this.activityService.getAllMyActivities().subscribe(data => this.activityService.allMyActivities = data);
        this.activityService.getAllMyPendingActivities().subscribe(data => this.activityService.allMyPendingActivities = data);
        this.activity = 'all-activities';


        // Byt ut till isChallenged
        for (const activity of this.allActivities) {
            if (activity.isactive === 0) {
                this.allActivities.splice(this.allActivities.indexOf(activity), 1);
                console.log('did not add' + activity);
                console.log('full list' + this.allActivities);


            }
        }

    }

    loadEvent(activity) {
        this.dataService.setData('activity', activity);
        this.router.navigateByUrl('/specific-event/activity');
    }

    goToCreateEvent() {
        this.router.navigate(['create-event']);
    }

    segmentChanged(event) {
        this.activity = event.target.value;
    }
}
