import {CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewContainerRef} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPage} from './event.page';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {DataService} from '../../services/data.service';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {UserService} from '../../services/user-service/user.service';
import {ActivityServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {FormsModule} from '@angular/forms';

describe('EventPage', () => {
    let component: EventPage;
    let fixture: ComponentFixture<EventPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [EventPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: Router, useValue: null},
                {provide: AuthService, useValue: null},
                {provide: ActivityService, useValue: new ActivityServiceMock()},
                {provide: DataService, ueValue: null},
                {provide: UserService, useValue: new UserServiceMock()},
                {provide: TemplateRef, useValue: null},
                {provide: ViewContainerRef, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
