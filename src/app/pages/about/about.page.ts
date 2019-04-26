import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    public results: Observable<any>;


    constructor() {
    }

    ngOnInit() {


    }


}
