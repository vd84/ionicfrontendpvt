import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {path: 'home', loadChildren: '../pages/home/home.module#HomePageModule'},
            {path: 'event', loadChildren: '../pages/event/event.module#EventPageModule'},
            {path: 'badges', loadChildren: '../pages/badges/badges.module#BadgesPageModule'},
            {path: 'map', loadChildren: '../pages/map/map.module#MapPageModule'},
            {path: 'settings', loadChildren: '../pages/settings/settings.module#SettingsPageModule'},
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
