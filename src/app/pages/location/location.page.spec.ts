import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationPage} from './location.page';
import {ActivatedRoute} from '@angular/router';
import {CheckinService} from '../../services/checkin-service/checkin.service';
import {UserService} from '../../services/user-service/user.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {Observable, of} from 'rxjs';
import 'rxjs-compat/add/observable/from';
import {Youthcentre} from '../../Models/youthcentre';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';

describe('LocationPage', () => {
    let component: LocationPage;
    let fixture: ComponentFixture<LocationPage>;
    let routeStub;

    beforeEach(async(() => {
        routeStub = {snapshot: {data: [{'youthcenter': new Youthcentre(1, null, 1, 1, 1, 'YouthCenterMock', 1)}]}};

        TestBed.configureTestingModule({
            declarations: [LocationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: ActivatedRoute, useValue: routeStub}, {
                provide: CheckinService,
                useValue: null
            }, {
                provide: UserService,
                useValue: new UserServiceMock()
            }, {provide: ActivityService, useValue: null},
            ,{provide: DataService, useValue:null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
