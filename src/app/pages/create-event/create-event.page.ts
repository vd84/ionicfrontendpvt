import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Events} from '@ionic/angular';

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

    constructor(private router: Router, private createdEvents: Events) {}


    ngOnInit() {
        // Lägg in databasladdning här
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
