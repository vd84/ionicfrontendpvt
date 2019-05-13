import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user-service/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: any;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
