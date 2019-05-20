import {Component, Host, OnInit, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {BadgeService} from '../../services/badge-service/badge.service';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-badges',
    templateUrl: './badges.page.html',
})
export class BadgesPage implements OnInit {
    badgeList: any;
    allBadges = [];
    allOfUsersBadges = [];
    allAvailBadges = [];
    hasShowedAvailBadges = false;
    progressValue: any;

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService, private userService: UserService) {
        this.badgeList = 'all-badges';
    }

    ngOnInit() {
        this.displayAllBadges();
        this.displayAllMyBadges();
        this.displayAvailBadges();
        this.progressValue = this.getProgressValue();
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

    getProgressValue() {
        return this.allOfUsersBadges.length / this.allBadges.length;
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
            this.hasShowedAvailBadges = true;
            let avail = true;
            for (let badge of this.allBadges) {
                for (let userBadge of this.allOfUsersBadges) {
                    if (badge.id === userBadge.id) {
                        avail = false;
                    }
                }
                if (!this.allAvailBadges.includes(badge) && avail) {
                    this.allAvailBadges.push(badge);
                }
                avail = true;
            }
    }

}
