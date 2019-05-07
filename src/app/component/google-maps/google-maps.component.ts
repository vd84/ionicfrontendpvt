import {AfterContentInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, Input} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';

declare var google;

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @Input()
    stop;
    @ViewChild('mapElement') mapElement;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    alllocations = [];
    timeToStop;

    ngOnInit(): void {
        this.youthcenterService.getAllLocations().subscribe(data => {
            this.alllocations = data;
        });


        this.addAllMarkers();
        /*window.addEventListener('beforeunload', () => {
            console.log('je');
           this.stop();});*/
    }


    constructor( public geolocation: Geolocation, private youthcenterService: YouthcenterService, private router: Router) {
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
        }, 1);
        console.log(this.stop);
    }


    /**
     * Läser in alla youth centres varje 3 sekund
     */

    addAllMarkers() {
       this.timeToStop = setInterval(() => {

            this.youthcenterService.getAllLocations().subscribe(data => {
                this.alllocations = data;
            });
            console.log(this.alllocations);

            let marker;

            for (const place of this.alllocations) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(place.lat, place.lng),
                    map: this.map,
                    icon : {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }
                });
                marker.addListener('click', () => {
                    this.router.navigate(['location']);
                });
            }

            if (window.onhashchange) {
                clearInterval(this.timeToStop);
            }
        }, 6000);
    }
   changeToOther() {
        clearInterval(this.timeToStop);
    }

}
