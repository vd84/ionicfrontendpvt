import { NgModule } from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
// SHARED MODULE WITH GOOGLE MAPS COMPONENT.
@NgModule({
    declarations: [GoogleMapsComponent],
    exports: [GoogleMapsComponent]
})
export class ComponentsModule {}
