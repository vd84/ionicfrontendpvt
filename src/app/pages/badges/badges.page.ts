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

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService, private userService: UserService) {
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
        if (this.hasShowedAvailBadges === false) {
            this.hasShowedAvailBadges = true;
            for (let i = 0; i < this.allBadges.length; i++) {
                for (let y = 0; y < this.allOfUsersBadges.length; y++) {
                    if (this.allOfUsersBadges[y].id !== this.allBadges[i].id) {
                        this.allAvailBadges.push(this.allBadges[i]);
                    }
                }
            }
        } else {
        } // Borde kanske finnas något för att uppdatera den här?
    }
}
