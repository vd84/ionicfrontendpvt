import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecificEventPage} from './specific-event.page';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {ParticipationService} from '../../services/participation-service/participation.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {Youthcentre} from '../../Models/youthcentre';

describe('SpecificEventPage', () => {
    let component: SpecificEventPage;
    let fixture: ComponentFixture<SpecificEventPage>;
    let routeStub;


    beforeEach(async(() => {
        routeStub = {snapshot: {data: {activity: 'activity'}}};
        TestBed.configureTestingModule({
            declarations: [SpecificEventPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: ActivatedRoute, useValue: routeStub}, {
                provide: UserService,
                useValue: new UserServiceMock()
            }, {provide: ParticipationService, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpecificEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
