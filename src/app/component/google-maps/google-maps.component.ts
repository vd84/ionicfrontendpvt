import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
declare var google;
import { Geolocation } from '@ionic-native/geolocation';
import { YouthcenterService } from '../../services/youthcenter.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterContentInit {
  map;
  mark;
  // SET LOCATION TO STOCKHOLM
  location = {lat: 59.334591, lng: 18.063240};
  markerOptions: any = {position: null, map: null, title: null};
  infoWindow;
  pos;
  private allLocations = [];
  @ViewChild('mapElement') mapElement;
  constructor(private ycService: YouthcenterService) { }

  ngOnInit(): void {}
  // ADDS MAP TO PAGE
  ngAfterContentInit(): void {
        this.map = new google.maps.Map(
        this.mapElement.nativeElement, {
          center: {lat: 59.334591, lng: 18.063240},
          zoom: 8,
            });
        this.getMarker();
        this.getLocation();
        this.getAllLocationsToMap();
  }
  // SET MARKER TO MAP
  getMarker (): void {
    this.markerOptions.position = this.location;
    this.markerOptions.map = this.map;
    this.markerOptions.title = 'My Location';
    this.mark = new google.maps.Marker(this.markerOptions);
  }
  // GET GEOLOCATION
  getLocation (): void {
    if (navigator.geolocation) {
      console.log('Det finns en location, wiiie!');
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }; console.log(pos);
        });
    }}
/*    addAllSoccerFields(): void {
    const url = 'http://api.stockholm.se/ServiceGuideService/ServiceUnitTypes/a05cd75b-c974-4890-9a7d-abc790997cf1/ServiceUnits?apikey=56010af30b114502bfbf8db404ef41a4';
    const request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'text/xml');
        request.onreadystatechange = function() {
          console.log('wooow!');
          if (request.readyState === 4 && request.status === 200) {
            console.log('hejeee');
              console.log(request.responseXML);
          }
        };
        request.send();
    }*/

    getAllLocationsToMap() {
      this.ycService.getAllLocations().subscribe(data => this.allLocations = data );
      for (const place of this.allLocations) {
        const posi = {
          lat: place.lat,
          lng: place.lng
        };
        const marker = new google.maps.Marker({
          position: posi,
          map: this.map
      });
    }
}
}
