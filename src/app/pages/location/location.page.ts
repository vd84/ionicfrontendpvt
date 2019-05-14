import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

    location: any;

    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['locationID']) {
            this.location = this.route.snapshot.data['locationID'];
            console.log(this.location);
        }

    }


}
