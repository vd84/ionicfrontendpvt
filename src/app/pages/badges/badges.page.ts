import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  badgeList: any;
  constructor(private router: Router) {
    this.badgeList = 'all-badges';
  }

  ngOnInit() {
  }
  segmentChanged(event) {
    this.badgeList = event.target.value;
  }
}
