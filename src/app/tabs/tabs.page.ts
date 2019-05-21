import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user-service/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
})
export class TabsPage implements OnInit {

  user: any;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
