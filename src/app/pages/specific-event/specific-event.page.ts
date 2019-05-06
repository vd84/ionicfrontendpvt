import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';

@Component({
    selector: 'app-specific-event',
    templateUrl: './specific-event.page.html',
    styleUrls: ['./specific-event.page.scss'],
})
export class SpecificEventPage implements OnInit {

    activity: any;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['activity']) {
            this.activity = this.route.snapshot.data['activity'];
        }
    }
    booked(): boolean {
        return this.authService.currentUser.value.isBooked(this.activity);
    }

    bookActivity() {
        this.authService.currentUser.value.bookActivity(this.activity);
    }
    removeActivity() {
        this.authService.currentUser.value.removeBookedActivity(this.activity);
    }

}
