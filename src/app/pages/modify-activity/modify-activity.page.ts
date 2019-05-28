import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../services/activity-service/activity.service';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-modify-activity',
    templateUrl: './modify-activity.page.html'
})
export class ModifyActivityPage implements OnInit {
    private name: any;
    private startdate: any;
    private starttime: any;
    private enddate: any;
    private endtime: any;
    private description: any;
    private activity;

    constructor(private activityService: ActivityService, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.activity = JSON.parse(localStorage.getItem('activityToModify'));
        this.name = this.activity.name;
        this.startdate = this.activity.startdate;
        this.enddate = this.activity.enddate;
        this.description = this.activity.description;
    }

    sendSuggestionAsChallenge() {
        this.activityService.modifyActivity(this.activity.id,
            this.name,
            this.description,
            this.userService.currentUser.id,
            this.activity.alternativelocation,
            0,
            this.activity.isactive,
            this.activity.category,
            this.activity.resource,
            this.activity.challenger,
            this.activity.challenged,
            this.activity.completed,
            this.activity.challengeaccepted,
            this.activity.challengerejected,
            this.activity.winner,
            this.startdate,
            this.enddate);
        this.router.navigate(['tabs/home']);
    }
}
