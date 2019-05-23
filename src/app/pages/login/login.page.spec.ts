import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPage} from './login.page';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let router: Router;
    let userService: UserService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule, RouterTestingModule.withRoutes([])],
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: UserService, useValue: new UserServiceMock()},
                {provide: ToastController, useValue: null},
                {provide: Facebook, useValue: null},
                {provide: NativeStorage, useValue: null},
                {provide: LoadingController, useValue: null},
                {provide: Platform, useValue: null},
                {provide: AlertController, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have fields for username and password', () => {
        component.username = 'test';
        component.password = 'test';
        expect(component.username).toBe('test');
        expect(component.password).toBe('test');
    });

    it('should have a method forgotPassword() that routes to reset-password', () => {

        let navigateSpy = spyOn(router, 'navigate');
        component.forgotPassword();
        expect(navigateSpy).toHaveBeenCalledWith(['reset-password']);

    });

    it('should have a method createProfile() that routes to register', () => {
        let navigateSpy = spyOn(router, 'navigate');
        component.createProfile();
        expect(navigateSpy).toHaveBeenCalledWith(['register']);
    });

    it('should have a method to log in calling the UserService');
    {
        userService = TestBed.get(UserService);
        let userServiceSpy = spyOn(userService, 'login');
        component.username = 'username';
        component.password = 'password';
        component.newLogin();
        expect(userServiceSpy).toHaveBeenCalledWith(['username', 'password']);
    }
});
