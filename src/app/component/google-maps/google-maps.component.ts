import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {AlertController, Events, Platform, ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {filter} from 'rxjs/operators';
import {passBoolean} from 'protractor/built/util';

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
    templateUrl: './google-maps.component.html'
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
    currentPosition = {lat: null, lng: null};
    user: any;


    constructor(public geolocation: Geolocation,
                private youthcenterService: YouthcenterService,
                private router: Router, private ngZone: NgZone,
                private events: Events, private alertctrl: AlertController,
                private plt: Platform,
                private dataService: DataService,
                private userservice: UserService,
                private checkinService: CheckinService,
                private toastController: ToastController) {
        /*load google map script dynamically */

        /*Get Current location*/
        this.geolocation.getCurrentPosition().then((position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });
        this.currentPosition = this.location;
        /*Map options*/
        this.mapOptions = {
            center: this.location,
            zoom: 11,
            mapTypeControl: false
        };

        // Adds map with marker att currentLocation
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        }, 5000);
        this.startTracking();

    }

    ngOnInit(): void {
        this.addStartMarker();
        this.user = this.userservice.currentUser;
        console.log(this.user);
        this.youthcenterService.getAllLocations();
        this.alllocations = this.youthcenterService.allYouthCentres;
        this.addAllMarkers();
    }

    addStartMarker() {
        setTimeout(() => {
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





    addAllMarkers() {

        setTimeout(() => {
            this.alllocations = this.youthcenterService.allYouthCentres;


            console.log(this.alllocations);

            // Loops through all places and adds blue marker
            for (const place of this.alllocations) {
                let marker;

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(place.lat, place.lon),
                    map: this.map,
                    description: place.id,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }


                });
                // Makes markers clickable and sends them to locationpage

                marker.addListener('click', () => { // Skriver ut rätt id. Något blir fel när jag skickar den.
                    this.dataService.setData('youthcentre', place);

                    this.router.navigateByUrl('/location/youthcentre');
                    console.log(place.lat);
                    console.log(this.geolocation.getCurrentPosition().then(pos => {
                        console.log(place.lat);
                        console.log(place.lng);
                        console.log(pos.coords.latitude);
                        console.log(pos.coords.longitude);
                        console.log(this.calculateIfCloseEnough(place.lat, place.lon, pos.coords.latitude, pos.coords.longitude));
                        localStorage.setItem('isCloseEnough', String(this.calculateIfCloseEnough(place.lat, place.lon, pos.coords.latitude, pos.coords.longitude)));
                        console.log(localStorage.getItem('isCloseEnough'));


                    }));


                });
            }
        }, 5000);
    }

    checkInOnCentre() {
        this.checkinService.youthcentreCheckin(11, 1);

    }

    calculateIfCloseEnough(userlat, userlon, targetlat, targetlon): boolean {

        function toRad(x) {
            return x * Math.PI / 180;
        }

        let lon1 = userlon;
        let lat1 = userlat;

        let lon2 = targetlon;
        let lat2 = targetlat;

        let R = 6371; // km

        let x1 = lat2 - lat1;
        let dLat = toRad(x1);
        let x2 = lon2 - lon1;
        let dLon = toRad(x2);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        d = d * 1000;

        return d < 100000000000000000000;


    }


    startTracking() {
        this.isTracking = true;

        let options = {
            frequency: 3000,
            enableHighAccuracy: true
        };

        this.positionSubscription = this.geolocation.watchPosition(options)
            .subscribe(data => {


                for (const place of this.alllocations) {

                    if (this.calculateIfCloseEnough(this.currentPosition.lat, this.currentPosition.lng, place.lat, place.lon)) {
                        this.presentToast('nearby event found!');
                    }
                }
                console.log(this.calculateIfCloseEnough(this.currentPosition.lat, this.currentPosition.lng, this.alllocations[0].lat, this.alllocations[0].lon));


                this.currentPosition.lat = data.coords.latitude;
                this.currentPosition.lng = data.coords.longitude;
                console.log(this.currentPosition);
                this.marker.setPosition(this.currentPosition);
            });

    }

    async presentToast(toastMessage: string) {
        const toast = await this.toastController.create({
            message: toastMessage,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
}
