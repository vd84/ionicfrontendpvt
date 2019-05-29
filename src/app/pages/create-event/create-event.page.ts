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
    private category;
    private challenged;
    private youthcenters = [];
    private startdate: string;
    private starttime: string;
    private enddate: string;
    private endtime: string;
    private activity;
    private allCategories = [];

    constructor(private router: Router, private createdEvents: Events, private youthcenterService: YouthcenterService, private activityService: ActivityService, private userService: UserService) {
    }


    ngOnInit() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
        setTimeout(() => {
            this.youthcenterService.getAllLocations();
            this.youthcenters = this.youthcenterService.allYouthCentres;
            this.loadallyouthcenters();
            this.allCategories = this.activityService.allCategories;
            for (const youthcentre of this.youthcenters) {
                if (youthcentre.id === this.userService.currentUser.currentyouthcentre) {
                    this.youthcenters.splice(this.youthcenters.indexOf(youthcentre), 1);
                }
            }
        }, 3000);
    }

    loadallyouthcenters() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
    }

    correctDates() {
        this.startdate = this.startdate.slice(0, 11) + this.starttime.slice(11, 20);
        this.enddate = this.enddate.slice(0, 11) + this.endtime.slice(11, 20);
    }


    createSuggestion() {
        this.correctDates();
        console.log(this.enddate);
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 1, this.category.id, this.userService.currentUser.currentyouthcentre, this.challenged, this.startdate, this.enddate); // skickar med suggestion = true (responsible user ska dessutom sättas till något annat.
         this.router.navigate(['tabs/home/']);


    }

    createActivity() {
        this.correctDates();
        this.activityService.addActivity(this.userService.currentUser.id, this.name, this.description, this.userService.currentUser.id, this.alt_location, 0, this.category.id, this.userService.currentUser.currentyouthcentre, this.challenged, this.startdate, this.enddate); // skickar med suggestion = false
        this.router.navigate(['tabs/home/']);
    }
}
