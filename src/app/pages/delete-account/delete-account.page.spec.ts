import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAccountPage} from './delete-account.page';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {UserServiceMock} from '../../../../test-config/mocks-ionic';
import {FormsModule} from '@angular/forms';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

describe('DeleteAccountPage', () => {
    let component: DeleteAccountPage;
    let fixture: ComponentFixture<DeleteAccountPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedDirectivesModule, FormsModule],
            declarations: [DeleteAccountPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: AlertController, useValue: null}, {provide: Router, useValue: null}, {
                provide: ToastController,
                useValue: null
            }, {provide: UserService, useValue: new UserServiceMock()}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteAccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
