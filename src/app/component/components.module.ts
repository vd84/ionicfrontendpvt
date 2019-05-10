import { NgModule } from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import {IonicModule} from '@ionic/angular';

/**
 * Detta är en delad component som används för att kunna använda de components som finns i den på flera olika ställen.
 *
 * För att lägga till en component i denna delade component:
 * Steg 1: Importera componenten likt detta: import { Component } from 'path'; där Component är den
 * component som ska importeras och path är där den finns.
 *
 * Steg 2: Sätt componenten som en declaration och en export i @NgModule nedan.
 *
 * ////////////////////////////////////////////////////////////////////////////////
 *
 * För att använda sig av componenten på andra sidor måste detta göras:
 *
 * Steg 1: Den sida där componenten ska ligga, gå in i dess module-fil och importera ComponentsModule.
 *
 * Steg 2: Lägg ComponentsModule under imports i @NgModule.
 *
 */
@NgModule({
    declarations: [GoogleMapsComponent],
    imports: [
        IonicModule
    ],
    exports: [GoogleMapsComponent]
})
export class ComponentsModule {}
