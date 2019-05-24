import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {AlertController, Events, Platform, ToastController} from '@ionic/angular';
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
    allMarkers = [];
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
            mapTypeControl: false,
            styles: [
                {
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#ebe3cd'
                        }
                    ]
                },
                {
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#523735'
                        }
                    ]
                },
                {
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#f5f1e6'
                        }
                    ]
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#c9b2a6'
                        }
                    ]
                },
                {
                    'featureType': 'administrative.land_parcel',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#dcd2be'
                        }
                    ]
                },
                {
                    'featureType': 'administrative.land_parcel',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#ae9e90'
                        }
                    ]
                },
                {
                    'featureType': 'landscape.natural',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#dfd2ae'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#dfd2ae'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#93817c'
                        }
                    ]
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#a5b076'
                        }
                    ]
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#447530'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#f5f1e6'
                        }
                    ]
                },
                {
                    'featureType': 'road.arterial',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#fdfcf8'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#f8c967'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#e9bc62'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway.controlled_access',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#e98d58'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway.controlled_access',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#db8555'
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#806b63'
                        }
                    ]
                },
                {
                    'featureType': 'transit.line',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#dfd2ae'
                        }
                    ]
                },
                {
                    'featureType': 'transit.line',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8f7d77'
                        }
                    ]
                },
                {
                    'featureType': 'transit.line',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#ebe3cd'
                        }
                    ]
                },
                {
                    'featureType': 'transit.station',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#dfd2ae'
                        }
                    ]
                },
                {
                    'featureType': 'water',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#b9d3c2'
                        }
                    ]
                },
                {
                    'featureType': 'water',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#92998d'
                        }
                    ]
                }
            ]
        }
        ;


        // Adds map with marker att currentLocation
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        }, 5000);
        this.startTracking();

        console.log(this.alllocations);

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
            this.markerOptions.icon = 'assets/icon/map-person-icon.png';
            this.marker = new google.maps.Marker(this.markerOptions);
        }, 5000);
    }


    /**
     * Läser in alla youth centres varje 3 sekund
     */



    removeAllMarkers() {
        for (const marker of this.allMarkers) {

            marker.setMap(null);


        }
        this.allMarkers = [];
        this.addAllMarkers();

    }


    addAllMarkers() {


        setTimeout(() => {
            this.alllocations = this.youthcenterService.allYouthCentres;

            // Loops through all places and adds blue marker
            for (const place of this.alllocations) {


                let marker;
                let checkedInYouthCentre = place.checkedin === this.userservice.currentUser.id;


                if (!checkedInYouthCentre) {

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(place.lat, place.lon),
                        map: this.map,
                        description: place.id,
                        icon: {
                            url: 'assets/icon/house-icon.png', scaledSize: {height: 30, width: 30}
                        }


                    });

                } else {

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(place.lat, place.lon),
                        map: this.map,
                        description: place.id,
                        icon: {
                            url: 'assets/icon/HasTakenHouse.png', scaledSize: {height: 30, width: 30}
                        }


                    });


                }

                this.allMarkers.push(marker);


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
                        // Tillagd kommentar


                    }));


                });
            }
        }, 5000);
        console.log(this.allMarkers);
        console.log(this.alllocations);

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

        return d < 10;


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
