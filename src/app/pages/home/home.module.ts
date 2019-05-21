import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';

import { ComponentsModule} from '../../component/components.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ComponentsModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
