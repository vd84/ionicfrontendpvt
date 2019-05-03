import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {IEvent} from '../../Interfaces/event';
import {Events} from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  activity: any;
  constructor(private router: Router, private authService: AuthService) {
  }


  ngOnInit() {
  }

  loadEvent() {
    this.router.navigate(['specific-event']);
  }
  goToCreateEvent()  {
    this.router.navigate(['create-event']);
  }
  segmentChanged(event) {
    this.activity = event.target.value;
  }
}
