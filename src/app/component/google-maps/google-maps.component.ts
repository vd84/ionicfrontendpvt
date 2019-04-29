import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement') mapElement;
  constructor() { }

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement, {
          center: {lat: 59.334591, lng: 18.063240},
          zoom: 8
        });
  }

}
