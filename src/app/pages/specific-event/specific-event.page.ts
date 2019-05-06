import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-specific-event',
    templateUrl: './specific-event.page.html',
    styleUrls: ['./specific-event.page.scss'],
})
export class SpecificEventPage implements OnInit {

    activity: any;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['activity']) {
            this.activity = this.route.snapshot.data['activity'];
        }
        console.log(this.activity.name);
    }

}
