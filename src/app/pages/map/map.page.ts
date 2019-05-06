import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NavController, NavParams, Platform} from '@ionic/angular';
import { Geolocation} from '@ionic-native/geolocation/ngx';
declare var google: any;
@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    @ViewChild('Map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyC6sG4u5OXLUxNg_9RwFqsmE6wJfSScilo'; /*Your API Key*/
    myVar;
    constructor(public zone: NgZone, public geolocation: Geolocation) {
        /*load google map script dynamically */
        const script = document.createElement('script');
        script.id = 'googleMap';
        if (this.apiKey) {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
        } else {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=';
        }
        document.head.appendChild(script);
        /*Get Current location*/
        this.geolocation.getCurrentPosition().then((position) =>  {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });
        /*Map options*/
        this.mapOptions = {
            center: this.location,
            zoom: 21,
            mapTypeControl: false
        };
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            /*Marker Options*/
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);
        }, 3000);
        this.addMarker();
    }

    ngOnInit(): void {
        this.myFunction();
    }
     myFunction() {
        this.myVar = setInterval(this.alertFunc, 3000);
    }

    alertFunc() {
        console.log('Hello!');
    }
    addMarker() {
        this.marker = new google.maps.Marker(59.3574318, 18.4683418);
    }

}
   /* map: any = null;
    positionMarker: any;
    @ViewChild('map') mapElement: ElementRef;
    styles = {
        default: null,
        hide: [
            {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            }
        ]
    };
    constructor(private router: Router, public navC: NavController, public navP: NavParams, public geoL: Geolocation, public p: Platform) {
    p.ready().then(() => {
        this.initMap();
    });
    }
    ngOnInit(): void {
    }

    initMap() {
        this.geoL.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
            let myLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                zoom: 15,
                center: myLocation,
                disableDefaultUI: true,
                options: { styles: this.styles['hide'] }
            });

            this.positionMarker = new google.maps.Marker({
                position: myLocation,
                map: this.map
            });


            this.geoL.watchPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).subscribe(data => {
                if (data.coords === undefined) { return; }

                myLocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
                this.positionMarker.setPosition(myLocation);
            }, err => {
                console.error('Error getting location:', err);
            });

        }).catch(err => {
            console.error('Error getting location:', err);
        });
    }

}
*/
