import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgesPage} from './badges.page';
import {Router} from '@angular/router';
import {BadgeService} from '../../services/badge-service/badge.service';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';
import {BadgeServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {HttpClient} from '@angular/common/http';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';

describe('BadgesPage', () => {
    let component: BadgesPage;
    let fixture: ComponentFixture<BadgesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [BadgesPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: Router, useValue: null},
                {provide: DataService, useValue: null},
                {provide: BadgeService, useValue: new BadgeServiceMock()},
                {provide: UserService, useValue: new UserServiceMock()},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* it('should set default badgeList to All', () => {
         expect(component.badgeList).toBe('all-badges');
     });

     it('should have a non empty array called allBadges', () => {

         let allBadges = component.allBadges;

         expect(Array.isArray(allBadges)).toBeTruthy();
         expect(component.allBadges.length).toBeGreaterThan(0);

     });

     it('should have a non empty array called allOfusersBadges', () => {

         let allOfUsersBadges = component.allOfUsersBadges;

         expect(Array.isArray(allOfUsersBadges)).toBeTruthy();
         expect(component.allOfUsersBadges.length).toBeGreaterThan(0);

     });

     it('should have non empty array called allAvailBadges', () => {

         let allAvailBadges = component.allAvailBadges;

         expect(Array.isArray(allAvailBadges)).toBeTruthy();
         expect(component.allAvailBadges.length).toBeGreaterThan(0);

     });

     it('should have a field progressValue initialized to 50%', () => {
         {
             let progressValue = component.getProgressValue();

             expect(progressValue).toBe(.5);
         }
     });

     */

    it('should have a variable for current tab and be able to set it through method call', () => {
        let tab = 'testTab';
        let event = {target: {value: tab}};
        expect(component.badgeList).toBeTruthy();
        component.segmentChanged(event);
        expect(component.badgeList).toEqual('testTab');

    });
    it('should return badge category', () => {
       let x = component.getBadgeCategory(0);
        expect(x).toBe('Incheckning');
       let y = component.getBadgeCategory(3);
       expect(y).toBe('Aktiviteter');
    });

    it('should return zero', () => {
        let x = component.getRows(3);
        expect(x).toEqual(1);
    });

});
