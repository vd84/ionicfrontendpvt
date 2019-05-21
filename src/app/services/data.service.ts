import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

/*
Den här klassen används för att hålla data när vi navigerar mellan vyer i applikationen, vilket är användbart för att skicka parametrar till den nya vyn. En array håller värden
mappade mot ett specifikt ID som vi kan använda för att hämta ut datan i den nya klassen. Den används på följande sätt:

1) Klassen som ska skicka datan: Importera DataService i konstruktorn. I metoden där navigationen sedan sker anropas först setData(id, data) i den här klassen, där ID kan vara
valfri sträng eller siffra. Därefter används router.nagivateByUrl('youthUrl') i stället för router.navigate('page'). Url här är den specifika platsen på målsidan där datan kommmer
att hamna vilket anges av vår DataResolver. För att det här ska fungera måste följande anges i app-routing.module:

2) App-routing.module: I routes:

 {
        path: 'target-page/:id', [Byt target-page mot sidans namn, exempelvis home/:id]
        resolve: {ID: DataResolverService}, [Byt ID mot namnet på den data som ska skickas, exempelvis activity. Detta är slutet av youthUrl:en som sedan används, ex. home/activity]
        loadChildren: [Använd samma väg som används för att navigera till målsidan, så copy/paste]
    },

3) Klassen som tar emot datan: Importera ActivatedRoute i konstruktorn. Ange sedan if (this.[ActivatedRouteVarName].snapshot.data['ID']) {this.variable = this.[ActivatedRouteVarName].snapshot.data['ID];
        }

 */
export class DataService {

    private data = [];

    constructor() {
    }

    setData(id, data) {
        this.data[id] = data;
    }

    getData(id) {
        return this.data[id];
    }
}


