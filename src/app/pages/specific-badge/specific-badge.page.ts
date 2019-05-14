import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-specific-badge',
  templateUrl: './specific-badge.page.html',
  styleUrls: ['./specific-badge.page.scss'],
})
export class SpecificBadgePage implements OnInit {

  badge: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data['badge']) {
      this.badge = this.route.snapshot.data['badge'];
      console.log(this.badge);
    }
  }

}
