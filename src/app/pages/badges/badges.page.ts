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

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService, private userService: UserService, private activeService: ActivityService) {
        this.badgeList = 'all-badges';
    }

    ngOnInit() {
        this.displayAllBadges();
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

    displayAllMyBadges(id) {
         this.badgeService.getAllMyBadges(id).subscribe(data => {
        this.allOfUsersBadges = data;
    });
    }
}
