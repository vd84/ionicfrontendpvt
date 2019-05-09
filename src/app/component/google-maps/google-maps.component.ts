import {AfterContentInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';

declare var google;

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {


    @ViewChild('mapElement') mapElement;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    alllocations = [];

    ngOnInit(): void {
        this.youthcenterService.getAllLocations().subscribe(data => {
            this.alllocations = data;
        });


        this.addAllMarkers();
    }


    constructor(public zone: NgZone, public geolocation: Geolocation, private youthcenterService: YouthcenterService) {
        /*load google map script dynamically */
        this.youthcenterService.getAllLocations().subscribe(data => {
            this.alllocations = data;
        });


        /*Get Current location*/
        this.geolocation.getCurrentPosition().then((position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });
        /*Map options*/
        this.mapOptions = {
            center: this.location,
            zoom: 11,
            mapTypeControl: false
        };


        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            /*Marker Options*/
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);
        }, 9);
    }


    /**
     * Läser in alla youth centres varje 3 sekund
     */

    addAllMarkers() {
        setInterval(() => {

            this.youthcenterService.getAllLocations().subscribe(data => {
                this.alllocations = data;
            });

            console.log(this.alllocations);

            let marker;

            for (const place of this.alllocations) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(place.lat, place.lng),
                    map: this.map
                });
            }


        }, 60000);
    }

}
