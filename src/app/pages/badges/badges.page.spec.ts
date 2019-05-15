import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgesPage} from './badges.page';
import {Router} from '@angular/router';
import {BadgeService} from '../../services/badge-service/badge.service';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user-service/user.service';
import {BadgeServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {HttpClient} from '@angular/common/http';

describe('BadgesPage', () => {
    let component: BadgesPage;
    let fixture: ComponentFixture<BadgesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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

    it('should set default badgeList to All', () => {
        expect(component.badgeList).toBe('all-badges');
    });

    it('should have one badge in All', () => {
        component.displayAllBadges();
        expect(component.allBadges.length).toBe(1);
    });

    it('should have one badge in myBadges', () => {
        component.displayAllMyBadges();
        expect(component.allOfUsersBadges.length).toBe(1);
    });

    it('should have no available badges', () => {
        component.displayAvailBadges();
        expect(component.allAvailBadges.length).toBe(0);
    });
});
