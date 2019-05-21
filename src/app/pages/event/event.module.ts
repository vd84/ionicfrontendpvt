import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {EventPage} from './event.page';
import {ComponentsModule} from '../../component/components.module';
import {SharedDirectivesModule} from '../../directives/shared-directives.module';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: EventPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ComponentsModule,
        SharedDirectivesModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [EventPage]
})
export class EventPageModule {
}
