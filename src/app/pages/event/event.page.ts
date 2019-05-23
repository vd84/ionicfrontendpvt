import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
})
export class EventPage implements OnInit {
    activity: any;

    constructor(private router: Router, private activityService: ActivityService, private dataService: DataService) {
    }


    ngOnInit() {
        this.activity = 'all-activities';

    }

    ionViewDidLeave() {
        console.log('LEFT');
    }

    ionViewWillEnter() {
        console.log('WILL ENTER VIEW');
        this.activityService.getAllActivities();
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

    isChallengerReturnString(activity): String {


        if (this.activityService.isChallenger(activity)) {
            return 'Challenger';
        } else {
            return '';
        }

    }

    isChallengedReturnString(activity) {


        if (this.activityService.isChallenged(activity)) {
            return 'Challenged';
        } else {
            return '';
        }

    }

    isSuggestionReturnString(activity) {


        if (this.activityService.activityIsSuggestion(activity)) {
            return 'Suggestion';
        } else {
            return '';
        }


    }

    isRejectedReturnString(activity) {


        if (this.activityService.activityIsDeclined(activity)) {
            return 'Rejected';
        } else {
            return '';
        }


    }

    dateHasPassed(activity) {


    }

    calculateColorForCard(activity) {

        if (this.activityService.endDateHasNotPassed(activity)) {
            return 'active';
        } else {
            return 'inactive';
        }




    }
}
