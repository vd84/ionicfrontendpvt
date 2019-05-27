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
    progressValue = 0.0;

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService, private userService: UserService) {
        this.badgeList = 'all-badges';
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.displayAllBadges();
        this.displayAllMyBadges();
        this.displayAvailBadges();
        setTimeout(() => {
            this.progressValue = this.getProgressValue();
        }, 1000);
    }

    loadBadge(badge) {
        this.dataService.setData('badge', badge);
        this.router.navigateByUrl('/specific-badge/badge');
    }

    displayAllBadges() {
        this.badgeService.getAllBadges().subscribe(data => {
            console.log('Badgepage ' + ' displayallbadges');
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
            console.log('Badgepage ' + ' displayallmybadges');
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
