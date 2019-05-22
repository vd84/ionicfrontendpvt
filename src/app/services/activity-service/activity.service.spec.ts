import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityService} from './activity.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user-service/user.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {ToastController} from '@ionic/angular';
import {SpecificEventPage} from '../../pages/specific-event/specific-event.page';

describe('ActivityService', () => {
    let service: ActivityService;
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{provide: HttpClient, useValue: null}, {
            provide: UserService,
            useValue: new UserServiceMock()
        }, {provide: ToastController, useValue: null}]
    }));

    beforeEach(() => {
        service = TestBed.get(ActivityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a variable activityUrl set to the correct path', () => {
        expect(service.activityUrl).toBeTruthy();
        expect(service.activityUrl).toBe('https://webbapppvt15grupp2.herokuapp.com/activity/');
    });

});
