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


    constructor(private router: Router, private authService: AuthService, private activityService: ActivityService, private dataService: DataService) {
    }


    ngOnInit() {
        this.activityService.getAllActivities();
        this.activityService.getAllMyActivities();
        // this.activityService.getAllMyPendingActivities().subscribe(data => this.activityService.allMyPendingActivities = data);
        this.activity = 'all-activities';




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
