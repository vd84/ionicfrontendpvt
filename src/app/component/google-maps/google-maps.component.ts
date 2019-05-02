import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
declare var google;
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterContentInit {
  map;
  marker;
  location = {lat: 59.334591, lng: 18.063240};
  markerOptions: any = {position: null, map: null, title: null};
  infoWindow;
  @ViewChild('mapElement') mapElement;
  constructor() { }

  ngOnInit(): void {}
  ngAfterContentInit(): void {
        this.map = new google.maps.Map(
        this.mapElement.nativeElement, {
          center: {lat: 59.334591, lng: 18.063240},
          zoom: 8,
            });
        this.getMarker();
  }
  getMarker (): void {
    this.markerOptions.position = this.location;
    this.markerOptions.map = this.map;
    this.markerOptions.title = 'My Location';
    this.marker = new google.maps.Marker(this.markerOptions);
    this.getLocation();
  }
  getLocation (): void {
  //  this.infoWindow = new google.maps.InfoWindow({
  //    content: 'hej'
  //  });
 /*   if (this.infoWindow === null) {
      console.log('Är null');
    }
    if (this.infoWindow != null) {
      console.log('Not null');
    }*/

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      console.log('Det finns en location, wiiie!');
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }; console.log(pos);
       // changeLocationOfMarker(pos);
        const pin = new google.maps.Marker();
        console.log('ny pin');
        console.log(pin === true);
        pin.setPosition(pos);
});
    }
      /*  if (this.infoWindow === null) {
          console.log(' är null 222');
        } if (this.infoWindow != null) {
          console.log(' Är inte null');
        }*/
        // console.log('Tjenis');
       /* if (this.infoWindow) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('Location found.');
        this.infoWindow.open(this.map);*/
       /* this.map.setCenter(pos); }
        }, function() {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  }  handleLocationError(browserHasGeolocation, infoWindow, pos): void {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }
*/
}


}
