import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home.page';
import {Router} from '@angular/router';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';
import {ActivityServiceMock, UserServiceMock} from '../../../../test-config/mocks-ionic';
import {UserService} from '../../services/user-service/user.service';
import {ActivityService} from '../../services/activity-service/activity.service';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {
                provide: UserService,
                userValue: new UserServiceMock()
            }, {provide: ActivityService, useValue: new ActivityServiceMock()}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
