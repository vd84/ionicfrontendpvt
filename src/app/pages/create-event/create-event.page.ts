import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {IEvent} from '../../Interfaces/event';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.page.html',
    styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
    private name: String;
    private location: String;
    private events = [];

    constructor(private router: Router) {}


    ngOnInit() {
    }
    submitEvent() {
        this.events.push(this.name);
        this.events.push(this.location);
    }

    goBackToEvent() {
        this.router.navigate(['event']);

    }
    getEvents() {
        return this.events.toString();
    }

    register(form: NgForm) {
    }


}
