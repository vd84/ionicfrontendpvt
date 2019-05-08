import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {BadgeService} from '../../services/badge-service/badge.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  badgeList: any;
  private badges = [];


  constructor(private router: Router, private authService: AuthService, private badgeService: BadgeService) {
    this.badgeList = 'all-badges';
  }

  ngOnInit() {
    this.badgeService.getAllBadges().subscribe(data => this.badges = data);
  }
  segmentChanged(event) {
    this.badgeList = event.target.value;
  }
}
