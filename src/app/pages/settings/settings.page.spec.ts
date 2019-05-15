import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPage} from './settings.page';
import {Router} from '@angular/router';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';

describe('SettingsPage', () => {
    let component: SettingsPage;
    let fixture: ComponentFixture<SettingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: NativeStorage, useValue: null}, {
                provide: LoadingController,
                useValue: null
            }, {provide: UserService, useValue: new UserServiceMock()}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
