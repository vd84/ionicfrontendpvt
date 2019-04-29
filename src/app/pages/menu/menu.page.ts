import { Component, OnInit } from '@angular/core';
import {Tab2Page} from '../tab2/tab2.page';
import {Tab1Page} from '../tab1/tab1.page';
import {TabsPage} from '../tabs/tabs.page';
import { IonicPage, NavController, Nav} from '@ionic/angular';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
