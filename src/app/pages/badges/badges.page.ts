import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BadgeService} from '../../services/badge-service/badge.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-badges',
    templateUrl: './badges.page.html',
    styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
    badgeList: any;
    allBadges = [];

    constructor(private router: Router, private badgeService: BadgeService, private dataService: DataService) {
        this.badgeList = 'all-badges';
    }

    ngOnInit() {
        this.displayAllBadges();
    }
    loadBadge(badge) {
        this.dataService.setData('badge', badge);
        this.router.navigateByUrl('/specific-badge/badge'); // Ska denna matcha den ovan eller hur funkar den?
    }

    displayAllBadges() {
        this.badgeService.getAllBadges().subscribe(data => {
            this.allBadges = data;
        });
    }


    segmentChanged(event) {
        this.badgeList = event.target.value;
    }
}
