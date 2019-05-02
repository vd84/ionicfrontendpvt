import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: any;
  startTime: Date;
  location: String;
  private activities = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBackToMenu() {
    this.router.navigate(['menu']);
  }

  loadEvent() {
    this.router.navigate(['specific-event']);
  }
}
