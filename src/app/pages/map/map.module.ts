import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ComponentsModule} from '../../component/components.module';

import {IonicModule} from '@ionic/angular';

import {MapPage} from './map.page';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ComponentsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MapPage]
})
export class MapPageModule {
}
