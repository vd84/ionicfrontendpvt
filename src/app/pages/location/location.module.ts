import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LocationPage} from './location.page';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: LocationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [LocationPage]
})
export class LocationPageModule {
}
