import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPage} from './settings.page';
import {Router} from '@angular/router';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user-service/user.service';
import {UserServiceMock, YouthCenterServiceMock} from '../../../../test-config/mocks-ionic';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';
import {YouthcenterService} from '../../services/youthcenter.service';

describe('SettingsPage', () => {
    let component: SettingsPage;
    let fixture: ComponentFixture<SettingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [SettingsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: NativeStorage, useValue: null}, {
                provide: LoadingController,
                useValue: null
            }, {provide: UserService, useValue: new UserServiceMock()}, {
                provide: YouthcenterService,
                useValue: new YouthCenterServiceMock()
            }]
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
