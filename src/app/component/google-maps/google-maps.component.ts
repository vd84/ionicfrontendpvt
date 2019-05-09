import {AfterContentInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, Input} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {interval} from 'rxjs';

declare var google: any;

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @ViewChild('mapElement')
    mapElement: ElementRef;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyC6sG4u5OXLUxNg_9RwFqsmE6wJfSScilo';

    constructor(public zone: NgZone, public geolocation: Geolocation) {
        const script = document.createElement('script');
        script.id = 'googleMap';
        if (this.apiKey) {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
        } else {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=';
        }
        document.head.appendChild(script);
        this.geolocation.getCurrentPosition().then((position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });
        this.mapOptions = {
            center: this.location,
            zoom: 21,
            mapTypeControl: false
        };
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);

        }, 3000);


    }

    ngOnInit(): void {
    }
}
