import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-specific-event',
    templateUrl: './specific-event.page.html',
})
export class SpecificEventPage implements OnInit {

    activity: any;
    user: any;
    winner: String;
    participants: any = [];
    competitors: any = [];

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private activityService: ActivityService, private checkInService: CheckinService, private toastController: ToastController) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['activity']) {
            this.activity = this.route.snapshot.data['activity'];
        } else {
            this.activity = {
                'id': 9000,
                'name': 'ACTIVITYNOTDEFINED',
                'startdate': null,
                'description': 'this activity has not been defined'
            };
        }
        this.user = this.userService.currentUser;
        this.participants = [{displayname: 'Test1'}, {displayname: 'Test2'}];
        this.competitors = [{id: this.activity.challenger, isWinner: false}, {id: this.activity.challenged, isWinner: false}];
        // this.participants = this.activityService.getAllActivityParticipants(this.activity.id);
    }

    booked(): boolean {
        return this.activityService.isMyActivity(this.activity.id);
        console.log('booked: ' + this.activityService.isMyActivity(this.activity.id));
    }

    bookActivity() {
        this.user.bookActivity(this.activity); // Should we keep or remove this?
        this.activityService.submitParticipation(this.user.id, this.activity.id);
        console.log(this.activityService.allMyActivities);
    }

    removeActivity() {
        this.user.removeBookedActivity(this.activity);
        this.activityService.removeParticipation(this.user.id, this.activity.id);
    }

    acceptChallenge() {
        // TODO
    }

    isChallenge(): boolean {
        return this.activityService.isChallenge(this.activity.id);
    }


    specifyWinner() {
        this.activityService.modifyActivity(this.activity.id, this.activity.name, this.activity.description, this.activity.responsibleuser, this.activity.alternativelocation, this.activity.issuggestion, this.activity.isactive, this.activity.category, this.activity.resource, this.activity.challenger, this.activity.challenged, this.activity.completed, this.activity.challengeaccepted, this.activity.challengerejected, this.winner);
    }

    isActivityOwner(): boolean {
        return (this.activity.challenger === this.user.currentyouthcentre || this.activity.challenged === this.user.currentyouthcentre) && !this.isChallenge();
    }

    checkInActivity() {

        if (this.activity.isactive === 0) {
            this.presentToast('Inte aktivt längre');
            return;
        }
        if (!this.userIsCloseEnough()) {
            this.presentToast('För långt ifrån');
            return;
        }


        this.checkInService.activityCheckin(this.userService.currentUser.id, this.activity.id);

    }

    userIsCloseEnough(): boolean {

        if (localStorage.getItem('isCloseEnough') === 'true') {
            return true;
        } else if (localStorage.getItem('isCloseEnough') === 'false') {
            return false;
        }
        return false;

    }

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

    radioChangeHandler(event) {
        this.winner = event.target.value;
    }
}
