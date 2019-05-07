import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {IEvent} from '../../Interfaces/event';
import {Event} from '../../Models/event';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    activity: any;
    allEvents = [];

    constructor(private router: Router, private authService: AuthService, private activityService: ActivityService, private dataService: DataService) {
    }


    ngOnInit() {
        this.activityService.getAllActivities().subscribe(data => this.allEvents = data);
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
