import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {AlertController, Events, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';
import {CheckinService} from '../../services/checkin-service/checkin.service';

declare var google;

/**
 * Steg 1: Component för Google Maps. Kör nmp install innan och se till att scriptet finns i index.html
 *
 * Steg 2: Den ligger i components.module och componentModule måste därför importeras där man vill använda
 * den. För mer information om hur detta görs, se components.module.
 *
 * Steg 3: För att sedan specifikt använda google maps componenten skapa en tagg i htmlen med selectorn.
 * Alltså: <app-google-maps></app-google-maps> för att använda denna component.
 */
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
    isTracking = false;
    positionSubscription: Subscription;

    ngOnInit(): void {
        this.youthcenterService.getAllLocations();
        this.alllocations = this.youthcenterService.allYouthCentres;
        this.addAllMarkers();
    }


    constructor(public geolocation: Geolocation,
                private youthcenterService: YouthcenterService,
                private router: Router, private ngZone: NgZone,
                private events: Events, private alertctrl: AlertController,
                private plt: Platform,
                private dataService: DataService,
                private userservice: UserService,
                private checkinService: CheckinService) {
        /*load google map script dynamically */

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

        // Adds map with marker att currentLocation
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            /*Marker Options*/
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);
        }, 5000);
    }

    /**
     * Läser in alla youth centres varje 3 sekund
     */


    ionViewDidLoad() {
        this.plt.ready().then(() => {

            let mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.geolocation.getCurrentPosition().then(pos => {
                let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                this.map.setCenter(latLng);
                this.map.setZoom(16);
            }).catch((error) => {
                console.log('Error getting location', error);
            });
        });
    }


    addAllMarkers() {


        setTimeout(() => {
            this.alllocations = this.youthcenterService.allYouthCentres;


            console.log(this.alllocations);

            // Loops through all places and adds blue marker
            for (const place of this.alllocations) {
                let marker;
                let infoWindow = new google.maps.InfoWindow({
                    content: '<ion-button (click)="checkInOnCentre(1,1)"></ion-button>',

                });
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(place.lat, place.lon),
                    map: this.map,
                    description: place.id,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }


                });
                // Makes markers clickable and sends them to locationpage
                marker.addListener('click', () => {
                    // this.dataService.setData('locationID', marker.description);
                    // this.router.navigateByUrl('/location/:locationID' );

                    infoWindow.open(this.map, marker);

                    console.log(marker.getPosition().lat());
                    console.log(marker.getPosition().lng());
                    console.log(marker.description);
                });
            }
        }, 5000);
    }

    checkInOnCentre() {
        this.checkinService.checkin(11, 1);

    }
}
