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
    private challenged ;
    private youthcenters = [];
    constructor(private router: Router, private createdEvents: Events, private youthcenterService: YouthcenterService, private activityservice: ActivityService, private userService: UserService) {}


    ngOnInit() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
        console.log(this.youthcenters);
       setTimeout( () => {
           this.youthcenterService.getAllLocations();
           this.youthcenters = this.youthcenterService.allYouthCentres;
           console.log(this.youthcenters);
           this.loadallyouthcenters();
       } , 8000);


    }
    submitEvent() {
        this.events.push(this.name);
        this.events.push(this.location);
        this.createdEvents.publish('publishedEvents', this.events);
    }
    challenge() {
        this.router.navigate(['challenge']);
    }

    register(form: NgForm) {
    }
loadallyouthcenters() {
        this.youthcenterService.getAllLocations();
        this.youthcenters = this.youthcenterService.allYouthCentres;
console.log(this.youthcenters);
}

addactivityandchallenge() {
        this.activityservice.addActivityAndChallenge(this.name, this.location, this.description, this.alt_location, this.category, this.userService.currentUser.currentyouthcentre, 1, this.userService.currentUser.id  );
}

}
