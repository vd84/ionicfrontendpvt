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
        this.http.get<Location[]>(this.url + this.userService.currentUser.id ).subscribe(data => {
            console.log(this.userService.currentUser.id );
                this.allYouthCentres = data;
            }, error1 => {
                console.log(error1);

            }
        );
    }
    getAllLocations2(): Observable<Location[]> {
       return this.http.get<Location[]>(this.url);
    }


}
