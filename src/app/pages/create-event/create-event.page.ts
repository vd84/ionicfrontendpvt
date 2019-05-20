import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Events} from '@ionic/angular';
import {YouthcenterService} from '../../services/youthcenter.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.page.html',
})
export class CreateEventPage implements OnInit {
    private name: String;
    private location: String;
    private events = [];
    private description: String;
    private alt_location: String;
    private category: number;
    private challenged;
    private youthcenters = [];

    constructor(private router: Router, private createdEvents: Events, private youthcenterService: YouthcenterService, private activityService: ActivityService, private userService: UserService) {
    }


    ngOnInit() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
        console.log(this.youthcenters);
        setTimeout(() => {
            this.youthcenterService.getAllLocations();
            this.youthcenters = this.youthcenterService.allYouthCentres;
            console.log(this.youthcenters);
            this.loadallyouthcenters();
        }, 8000);


    }

    loadallyouthcenters() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
        console.log(this.youthcenters);
    }

    createSuggestion() {
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 1, this.category, this.userService.currentUser.currentyouthcentre, this.challenged); // skickar med suggestion = true (responsible user ska dessutom sättas till något annat.
        setTimeout(() => {
            this.activityService.generateAllMyActivities();
        }, 25);
        this.router.navigate(['tabs/event/']);
    }

    createActivity() {
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 0, this.category, this.userService.currentUser.currentyouthcentre, this.challenged); // skickar med suggestion = false
        setTimeout(() => {
            this.activityService.generateAllMyActivities();
        }, 25);
        this.router.navigate(['tabs/event/']);
    }

    testPrint() {
        setTimeout(() => {
            console.log(this.challenged);

        }, 50);
    }


}
