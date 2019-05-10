import { Component, OnInit } from '@angular/core';
import {BadgeService} from '../../services/badge-service/badge.service';
import {AuthService} from '../../services/authentication-service/auth.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  constructor(private badgeService: BadgeService, private authService: AuthService) { }

  ngOnInit() {
  }
  checkIn() {
    console.log(this.authService.currentUser.value.id);
  }

}
