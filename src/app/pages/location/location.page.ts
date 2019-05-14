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

    youthcentre: any;

    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['youthcentre']) {
            this.youthcentre = this.route.snapshot.data['youthcentre'];
            console.log(this.youthcentre);
        } else {
            console.log('Inte rätt');
        }

    }


}
