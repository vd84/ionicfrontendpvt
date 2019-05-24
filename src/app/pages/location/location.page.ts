import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserService} from '../../services/user-service/user.service';
import {Youthcentre} from '../../Models/youthcentre';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
})
export class LocationPage implements OnInit {

    youthcentre: any;
    user: any;
    allActivitiesForYouthCentreToShow = [];
    currentPosition = {lat: null, lng: null};
    location = {lat: null, lng: null};


    constructor(private route: ActivatedRoute, private checkinService: CheckinService, private userService: UserService, private activityService: ActivityService, private dataService: DataService, private router: Router, public geolocation: Geolocation) {
        this.geolocation.getCurrentPosition().then((position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });
        this.currentPosition = this.location;
    }

    ngOnInit() {
        this.activityService.getAllActivities();
        if (this.route.snapshot.data['youthcentre']) {
            this.youthcentre = this.route.snapshot.data['youthcentre'];
            console.log(this.youthcentre);
        } else {
            this.youthcentre = new Youthcentre(9000, null, null, null, null, 'CENTERNOTDEFINED', null);
            console.log('Inte rätt');
        }
        this.user = this.userService.currentUser;

        this.generateActvitiesForYouthCentreToShow();


    }

    checkin() {

        console.log('youthcentreid ' + this.youthcentre.id);
        console.log('userid ' + this.user.id);
        this.checkinService.youthcentreCheckin(this.user.id, this.youthcentre.id);
        this.youthcentre.checkedin = this.userService.currentUser.id;

    }

    /*    loadEvent(activity) {
            this.dataService.setData('activity', activity);
            this.router.navigateByUrl('/specific-event/activity');
        }*/


    loadEvent(activity) {
        this.dataService.setData('activity', activity);
        this.router.navigateByUrl('/specific-event/activity');
    }

    generateActvitiesForYouthCentreToShow() {

        for (const activity of this.activityService.allActivities) {
            console.log(activity.challenger + ' challenger');
            console.log(activity.challenged + ' challenged');
            console.log(this.youthcentre.id + ' youthcentre id');
            if (activity.challenger === this.youthcentre.id || activity.challenged === this.youthcentre.id) {
                this.allActivitiesForYouthCentreToShow.push(activity);

            }
        }
    }


    userIsCloseEnough() {
        return localStorage.getItem('isCloseEnough') === 'true';

    }

    userCanCheckIn() {


        if (this.youthcentre.checkedin === 0  && this.userIsCloseEnough() ) {
            return true;
        }
    }
    userPlacement(targetlat, targetlon, userlat, userlon) {

        // might be unnessesary
         let  userlatbeforetracking = parseFloat(localStorage.getItem(userlat));
         let userlonbeforetracking = parseFloat(localStorage.getItem(userlon));

       if (userlatbeforetracking != null) {
           userlatbeforetracking = userlat;
           userlonbeforetracking = userlon;
       }

        function toRad(x) {
            return x * Math.PI / 180;
        }

        let lon1 = userlon;
        let lat1 = userlat;

        let lon2 = targetlon;
        let lat2 = targetlat;

        let R = 6371; // km

        let x1 = lat2 - lat1;
        let dLat = toRad(x1);
        let x2 = lon2 - lon1;
        let dLon = toRad(x2);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        if (d > 1) { return Math.round(d) + ' km'; } else if (d <= 1) { return Math.round(d * 1000) + ' meter'; } else { return 'error'; }

    }

}
