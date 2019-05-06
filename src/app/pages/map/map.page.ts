import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NavController, NavParams, Platform} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;
@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    map: any = null;
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
