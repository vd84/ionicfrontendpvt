import { Component, OnInit } from '@angular/core';
import {HelloService} from '../../services/hello.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  public items: any;

  constructor() { }

  ngOnInit() {
  }


  getAllHellos() {

  }




}
