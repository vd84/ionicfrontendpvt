import {Injectable} from '@angular/core';
import {Location} from '../Interfaces/location';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user-service/user.service';


@Injectable({
    providedIn: 'root'
})
export class YouthcenterService {
    url = 'https://webbapppvt15grupp2.herokuapp.com/youthcentre/';


    allYouthCentres = [];


    constructor(private http: HttpClient, private userService: UserService) {
    }

    getAllLocations() {

        let id;

        if (this.userService.currentUser === undefined) {
            id = 0;
        } else {
            id = this.userService.currentUser.id;
        }
        return this.http.get<Location[]>(this.url + id).subscribe(data => {
                this.allYouthCentres = data;
                    console.log(data);



            }, error1 => {
                console.log(error1);

            }

        ); console.log(this.allYouthCentres);
    }


    getTheRightId(id) {

        let returnStatement = '';


        for (const youthCentre of this.allYouthCentres) {

            console.log(youthCentre.id);
            if (youthCentre.id === id) {
                returnStatement = youthCentre.name;
                return returnStatement;
            } else {
                returnStatement = 'Du har ingen ungdomsgård';
            }

        }
        return returnStatement;


    }


    getAllLocationsObservable() {
        return this.http.get<Location[]>(this.url + this.userService.currentUser.id);
    }

    getAllLocations2(): Observable<Location[]> {
        return this.http.get<Location[]>(this.url);
    }


}
