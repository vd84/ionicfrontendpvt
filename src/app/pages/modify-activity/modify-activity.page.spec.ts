import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyActivityPage} from './modify-activity.page';
import {Router} from '@angular/router';
import {ActivityService} from '../../services/activity-service/activity.service';
import {ActivityServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {UserService} from '../../services/user-service/user.service';

describe('ModifyActivityPage', () => {
    let component: ModifyActivityPage;
    let fixture: ComponentFixture<ModifyActivityPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{provide: Router, useValue: null}, {
                provide: ActivityService,
                useValue: new ActivityServiceMock()
            }, {provide: UserService, userValue: new UserServiceMock()}],
            declarations: [ModifyActivityPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModifyActivityPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
