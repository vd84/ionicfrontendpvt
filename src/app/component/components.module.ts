import { NgModule } from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import {IonicModule} from '@ionic/angular';
// SHARED MODULE WITH GOOGLE MAPS COMPONENT.
@NgModule({
    declarations: [GoogleMapsComponent],
    imports: [
        IonicModule
    ],
    exports: [GoogleMapsComponent]
})
export class ComponentsModule {}
