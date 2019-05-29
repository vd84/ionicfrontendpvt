import {fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';

import {ActivityService} from './activity.service';
import {UserService} from '../user-service/user.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {ToastController} from '@ionic/angular';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {User} from '../../Models/user';

describe('ActivityService', () => {
    let injector: TestBed;
    let service: ActivityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ActivityService, {provide: UserService, useValue: new UserServiceMock()}, {
                provide: ToastController,
                useValue: null
            }, {provide: HttpClient, useValue: null}]
        });
        injector = getTestBed();
        service = injector.get(ActivityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a variable activityUrl set to the correct path', () => {
        expect(service.postAndPutactivityUrl).toBeTruthy();
        expect(service.postAndPutactivityUrl).toBe('https://webbapppvt15grupp2.herokuapp.com/activity/');
    });

    it('should have a variable participationUrl set to the correct path', () => {
        expect(service.participationUrl).toBeTruthy();
        expect(service.participationUrl).toBe('https://webbapppvt15grupp2.herokuapp.com/participation/');
    });

    it('should have a variable youthCentreUrl set to the correct path', () => {
        expect(service.youthCentreUrl).toBeTruthy();
        expect(service.youthCentreUrl).toBe('https://webbapppvt15grupp2.herokuapp.com/activity/youthcentre/');
    });

    it('should have a variable participationByActivityUrl set to the correct path', () => {
        expect(service.participationByActivityUrl).toBeTruthy();
        expect(service.participationByActivityUrl).toBe('https://webbapppvt15grupp2.herokuapp.com/participationbyactivity/');
    });

    it('should have the following lists: adminActivities, allActivities, allActivitiesFromDatabase, allMyActivities & allActivityParticipants', () => {
        expect(service.adminActivities).toBeTruthy();
        expect(service.allActivities).toBeTruthy();
        expect(service.allActivitiesFromDatabase).toBeTruthy();
        expect(service.allMyActivities).toBeTruthy();
        expect(service.allActivityParticipants).toBeTruthy();
        expect(service.allActiveActivities).toBeTruthy();
        expect(service.allMyActiveActivities).toBeTruthy();
        expect(service.allActivityParticipants).toBeTruthy();
        expect(service.allCategories).toBeTruthy();


    });

    it('should convert datetime to correct format', () => {


        expect(service.changeDateFormat('2019-05-29T11:32:13.423+02:00')).toBe('2019-05-29T11:32:13');
    });

    it('date should not have passed', () => {


        expect(service.endDateHasNotPassed(JSON.stringify({'enddate': '2019-01-29T11:32:13'}))).toBe(true);

    });

    it('list should contain activities that are suggested or not accpeted or declined', () => {


        service.addMySuggestedAndNotAcceptedOrDeclinedActivitiesToMyActivitiesPage();

        let allMyActivities = service.allMyActivities;

        let user = {'id': 1};

        for (const activity of allMyActivities) {


            expect((activity.issuggestion && activity.createdby === user.id) || (activity.createdby === user.id && activity.challengeaccepted === 0 && activity.challengerejected === 0)).toBe(true);
        }
    });

    it('should be an suggestion', () => {

        let activity = {'issuggestion': 1};
        expect(service.activityIsSuggestion(activity)).toBe(true);
    });
});





