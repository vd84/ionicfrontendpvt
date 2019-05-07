import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {ParticipationService} from '../../services/participation-service/participation.service';

@Component({
    selector: 'app-specific-event',
    templateUrl: './specific-event.page.html',
    styleUrls: ['./specific-event.page.scss'],
})
export class SpecificEventPage implements OnInit {

    activity: any;
    user: any;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private participationService: ParticipationService) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['activity']) {
            this.activity = this.route.snapshot.data['activity'];
        }
        this.user = this.authService.currentUser.value;
    }

    booked(): boolean {
        return this.authService.currentUser.value.isBooked(this.activity);
    }

    bookActivity() {
        this.user.bookActivity(this.activity);
        this.participationService.submitParticipation(this.user.id, this.activity.id);
    }

    removeActivity() {
        this.user.removeBookedActivity(this.activity);
    }

}
