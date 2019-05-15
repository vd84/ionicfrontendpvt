import {CUSTOM_ELEMENTS_SCHEMA, NgZone} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoogleMapsComponent} from './google-maps.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {YouthcenterService} from '../../services/youthcenter.service';
import {Router} from '@angular/router';
import {AlertController, Events, Platform} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';

describe('GoogleMapsComponent', () => {
    let component: GoogleMapsComponent;
    let fixture: ComponentFixture<GoogleMapsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoogleMapsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Geolocation, useValue: null}, {provide: YouthcenterService, useValue: null}, {
                provide: Router,
                useValue: null
            }, {provide: NgZone, useValue: null}, {provide: Events, useValue: null}, {
                provide: AlertController,
                useValue: null
            }, {provide: Platform, useValue: null}, {provide: DataService, useValue: null}, {
                provide: UserService,
                useValue: new UserServiceMock()
            }, {provide: CheckinService, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GoogleMapsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*  it('should create', () => {
          expect(component).toBeTruthy();
      });
     */
});
