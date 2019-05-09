import {AfterContentInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, Input} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {interval} from 'rxjs';

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
    needsRefreshing = false;
    ngOnInit(): void {
        this.youthcenterService.getAllLocations().subscribe(data => {
            this.alllocations = data;
        });

        this.addAllMarkers();
    }


    constructor( public geolocation: Geolocation, private youthcenterService: YouthcenterService, private router: Router, private ngZone: NgZone, private events: Events) {
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

        // Adds map with marker att currentLocation
        setTimeout(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
            /*Marker Options*/
            this.markerOptions.position = this.location;
            this.markerOptions.map = this.map;
            this.markerOptions.title = 'My Location';
            this.marker = new google.maps.Marker(this.markerOptions);
            let centerControlDiv = document.createElement('div');
            let centerControl = new this.createRefreshButton(centerControlDiv, this.map);
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
        }, 2000);
    }
    createRefreshButton(b, map) {
        // Set CSS for the control border.
        let controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        b.appendChild(controlUI);

        // Set CSS for the control interior.
        let controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function () {
            console.log('mh');
        });
    }


    /**
     * Läser in alla youth centres varje 3 sekund
     */

    addAllMarkers() {
        let timesRun = 0;
       let intervalTime = setInterval(() => {
                timesRun++;
                console.log(timesRun);
                if (timesRun === 6) {
                    this.needsRefreshing = true;
                    clearInterval(intervalTime);
                }
            this.youthcenterService.getAllLocations().subscribe(data => {
                this.alllocations = data;
            });
            console.log(this.alllocations);

            let marker;
            // Loops through all places and adds blue marker
               for (const place of this.alllocations) {
                   marker = new google.maps.Marker({
                       position: new google.maps.LatLng(place.lat, place.lng),
                       map: this.map,
                       icon: {
                           url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                       }
                   });
                   // Makes markers clickable and sends them to locationpage
                   marker.addListener('click', () => {
                       this.router.navigate(['location']);
                   });
               }

               if (window.onhashchange) {
                   clearInterval(this.timeToStop);
               }
           } , 10000);
    }
    // Method to stop the interval of asking database about places
/*   changeToOther() {
        let timeOfOpenWindow = 0;
     let totalInterval = setInterval(() => {
             timeOfOpenWindow++;
             if (timeOfOpenWindow === 10) {
                 location.reload();
             }
     }, 10000);
    }*/

}
