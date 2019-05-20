import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SpecificEventPage} from './specific-event.page';
import {FormsModule} from '@angular/forms';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';

const routes: Routes = [
    {
        path: '',
        component: SpecificEventPage
    }
];

@NgModule({
    imports: [
        SharedDirectivesModule,
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [SpecificEventPage]
})
export class SpecificEventPageModule {
}
