import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEventPage} from './create-event.page';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';

describe('CreateEventPage', () => {
    let component: CreateEventPage;
    let fixture: ComponentFixture<CreateEventPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CreateEventPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}, {provide: Events, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
