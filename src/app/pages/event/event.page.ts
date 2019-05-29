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
    hasSearched = false;
    searchedActivities = [];
    haveChosenCategory = false;
    selectedCategory = [];
    constructor(private router: Router, private activityService: ActivityService, private dataService: DataService) {
    }

    ngOnInit() {
        this.activity = 'all-activities';

    }

    ionViewDidLeave() {
        console.log('LEFT');
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

    searchActivity(ev: any) {
        this.searchedActivities = [];
        let input = ev.target.value;
        let inputReg = new RegExp(input, 'i');
        for (let activity of this.activityService.allActiveActivities) {
            if (inputReg.exec(activity.name)) {
                this.searchedActivities.push(activity);
            }
        }
    }

    getStartDate(activity: any) {

        let output = activity.startdate.substr(0, 16);


        return output;
    }

    getActivityLabel(activity: any) {
        if (this.activityService.activityIsSuggestion(activity)) {
            return 'Förslag';
        } else if (!this.activityService.activityIsAccepted(activity)) {
            if (this.activityService.isChallenger(activity)) {
                return 'Utmaning skickad';
            } else if (this.activityService.isChallenged(activity)) {
                return 'Utmaning mottagen';
            }
        } else if (this.activityService.endDateHasNotPassed(activity)) {
            return this.activityService.hasStarted(activity) ? 'Pågår' : 'Kommande';
        } else {
            return 'Avslutad';
        }
    }

    sortByCategory(ev: any) {
        this.haveChosenCategory = true;
        this.selectedCategory = [];
        let input = ev.target.value;
        let inputReg = new RegExp(input, 'i');
            if (inputReg.exec('Alla')) {
                    this.activity = 'all-activities';
                    this.haveChosenCategory = false;
                    this.hasSearched = false;
                    this.shouldBeVisible();
            }
        for (let activity of this.activityService.allActiveActivities) {
            if (inputReg.exec(activity.categorytext)) {
                this.selectedCategory.push(activity);
            }
        }
    }
    shouldBeVisible() {
        return !this.hasSearched && !this.haveChosenCategory;
    }
}

