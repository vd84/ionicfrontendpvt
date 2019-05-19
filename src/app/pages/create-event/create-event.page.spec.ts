import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEventPage} from './create-event.page';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {YouthcenterService} from '../../services/youthcenter.service';
import {ActivityService} from '../../services/activity-service/activity.service';
import {UserService} from '../../services/user-service/user.service';
import {ActivityServiceMock, UserServiceMock, YouthCenterServiceMock} from '../../../../test-config/mocks-ionic';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

describe('CreateEventPage', () => {
    let component: CreateEventPage;
    let fixture: ComponentFixture<CreateEventPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [CreateEventPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: Events, useValue: null}, {
                provide: YouthcenterService,
                useValue: new YouthCenterServiceMock()
            }, {provide: ActivityService, useValue: new ActivityServiceMock()}, {provide: UserService, useValue: new UserServiceMock()}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
