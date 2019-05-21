import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
    private category: String;
    private challenged;
    private youthcenters = [];
    private startdate: string;
    private enddate: string;

    constructor(private router: Router, private createdEvents: Events, private youthcenterService: YouthcenterService, private activityService: ActivityService, private userService: UserService) {
    }


    ngOnInit() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
        setTimeout(() => {
            this.youthcenterService.getAllLocations();
            this.youthcenters = this.youthcenterService.allYouthCentres;
            this.loadallyouthcenters();
        }, 8000);


    }

    loadallyouthcenters() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
    }


    createSuggestion() {
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 1, this.getCategoryID(), this.userService.currentUser.currentyouthcentre, this.challenged, this.startdate, this.enddate); // skickar med suggestion = true (responsible user ska dessutom sättas till något annat.
        setTimeout(() => {
            this.activityService.generateAllMyActivities();
        }, 25);
        this.router.navigate(['tabs/event/']);
    }

    createActivity() {
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 0, this.getCategoryID(), this.userService.currentUser.currentyouthcentre, this.challenged, this.startdate, this.enddate); // skickar med suggestion = false
        setTimeout(() => {
            this.activityService.generateAllMyActivities();
        }, 25);
        this.router.navigate(['tabs/event/']);
    }

    getCategoryID() {
        if (this.category === 'Football') {
            return 1;
        } else if (this.category === 'Chess') {
            return 11;
        }
    }

    onChange(event) {
        this.category = event.target.value;
    }
}
