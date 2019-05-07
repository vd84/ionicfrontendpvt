import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {DataService} from '../services/data.service';

@Injectable({
    providedIn: 'root'
})

/*
Class is used to handle data being sent through our DataService. The resolve method is called by the router so no need to actually use this class.
 */
export class DataResolverService implements Resolve<any> {

    constructor(private dataService: DataService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let id = route.paramMap.get('id');
        return this.dataService.getData(id);
    }
}
