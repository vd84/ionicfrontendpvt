import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterPage} from './register.page';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {UserServiceMock, YouthCenterServiceMock} from '../../../../test-config/mocks-ionic';
import {FormsModule} from '@angular/forms';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {YouthcenterService} from '../../services/youthcenter.service';

describe('RegisterPage', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [RegisterPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: ToastController, useValue: null}, {
                provide: UserService,
                useValue: new UserServiceMock()
            }, {provide: YouthcenterService, useValue: new YouthCenterServiceMock()}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
