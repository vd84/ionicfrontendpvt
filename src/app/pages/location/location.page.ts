import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserService} from '../../services/user-service/user.service';
import {Youthcentre} from '../../Models/youthcentre';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
})
export class LocationPage implements OnInit {

    youthcentre: any;
    user: any;
    close: boolean;

    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService, private events: Events) {
    }

    ngOnInit() {
        if (this.route.snapshot.data['youthcentre']) {
            this.youthcentre = this.route.snapshot.data['youthcentre'];
            console.log(this.youthcentre);
        } else {
            this.youthcentre = new Youthcentre(9000, null, null, null, null, 'CENTERNOTDEFINED', null);
            console.log('Inte rätt');
        }
        this.user = this.userService.currentUser;
        console.log(this.youthcentre);

    }
    checkin () {

        console.log('youthcentreid ' + this.youthcentre.id);
        console.log('userid ' + this.user.id);
        this.checkinService.checkin(this.user.id,  this.youthcentre.id);
    }

}
