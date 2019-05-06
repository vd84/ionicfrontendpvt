import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

declare var google: any;
import {Geolocation, GeolocationOptions, Geoposition, PositionError} from '@ionic-native/geolocation';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    options: GeolocationOptions;
    currentPos: Geoposition;

    constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    }

    ngOnInit() {
    }
}

