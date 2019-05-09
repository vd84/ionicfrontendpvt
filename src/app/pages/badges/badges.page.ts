import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BadgeService} from '../../services/badge-service/badge.service';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/authentication-service/auth.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-badges',
    templateUrl: './badges.page.html',
    styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
    badgeList: any;
    allBadges = [];
    allOfUsersBadges = [];
    allAvailBadges = [];

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService, private userService: UserService, private activeService: ActivityService) {
        this.badgeList = 'all-badges';
    }

    ngOnInit() {
        this.displayAllBadges();
        this.displayAllMyBadges();
        this.displayAvailBadges();
    }
    loadBadge(badge) {
        this.dataService.setData('badge', badge);
        this.router.navigateByUrl('/specific-badge/badge');
    }

    displayAllBadges() {
        this.badgeService.getAllBadges().subscribe(data => {
            this.allBadges = data;
        });
    }


    segmentChanged(event) {
        this.badgeList = event.target.value;
    }

    displayAllMyBadges() {
         this.badgeService.getAllMyBadges(this.userService.currentUser.id).subscribe(data => {
        this.allOfUsersBadges = data;
    });
    }

    displayAvailBadges() {
        console.log(this.allBadges.length);
       // this.allAvailBadges.push()
        for (let i = 0; i < this.allBadges.length; i++) {
            console.log('Badge av alla id: ' + this.allBadges[i].id);
            for (let y = 0; y < this.allOfUsersBadges.length; y++) {
                console.log('Badge av användare id: ' + this.allOfUsersBadges[y].id);
                if (this.allOfUsersBadges[y].id !== this.allBadges[i].id) {
                    console.log('True eller false om att det inte är samma? ' + (this.allOfUsersBadges[y].id !== this.allBadges[y].id));
                    this.allAvailBadges.push(this.allBadges[i]);
                }
            }
        }
    }
}
