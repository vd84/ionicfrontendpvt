import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChallengePage} from './challenge.page';
import {Router} from '@angular/router';

describe('ChallengePage', () => {
    let component: ChallengePage;
    let fixture: ComponentFixture<ChallengePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChallengePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{provide: Router, useValue: null}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChallengePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
