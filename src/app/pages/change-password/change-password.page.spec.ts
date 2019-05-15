import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangePasswordPage} from './change-password.page';
import {Router} from '@angular/router';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {UserService} from '../../services/user-service/user.service';
import {IonicModule, ToastController} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('ChangePasswordPage', () => {
    let component: ChangePasswordPage;
    let fixture: ComponentFixture<ChangePasswordPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, IonicModule, RouterTestingModule],
            declarations: [ChangePasswordPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: ToastController, userValue: null}, {
                provide: UserService,
                useValue: new UserServiceMock()
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
