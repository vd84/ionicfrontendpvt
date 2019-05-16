import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPage} from './login.page';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authentication-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: AuthService, useValue: null}, {
                provide: UserService,
                useValue: new UserServiceMock()
            }, {provide: ToastController, useValue: null}, {provide: Facebook, useValue: null}, {
                provide: NativeStorage,
                useValue: null
            }, {provide: LoadingController, useValue: null}, {provide: Platform, useValue: null}, {
                provide: AlertController,
                useValue: null
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
