import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {IEvent} from '../../Interfaces/event'
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.page.html',
    styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
    private name: String;
    private location: String;
    private events = [];

    constructor(private router: Router, private createdEvents: Events) {}


    ngOnInit() {
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


}
