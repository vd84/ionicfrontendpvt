import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {IEvent} from '../../Interfaces/event';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
  }

  loadEvent() {
    this.router.navigate(['specific-event']);
  }
  goToCreateEvent()  {
    this.router.navigate(['create-event']);
  }
}
