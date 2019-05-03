import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-specific-event',
    templateUrl: './specific-event.page.html',
    styleUrls: ['./specific-event.page.scss'],
})
export class SpecificEventPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

}
