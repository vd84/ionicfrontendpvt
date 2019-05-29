import {Component, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Observable} from 'rxjs';
import {ActivityService} from '../../services/activity-service/activity.service';




@Component({
    selector: 'app-map',
    templateUrl: 'map.page.html',
})
export class MapPage implements OnInit {


    constructor(private activityService: ActivityService) {
    }

    ngOnInit(): void {
    }






}
