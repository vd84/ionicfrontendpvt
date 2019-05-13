import {Injectable} from '@angular/core';
import {Location} from '../Interfaces/location';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class YouthcenterService {
    url = 'https://webbapppvt15grupp2.herokuapp.com/youthcentre/';


    allYouthCentres = [];


    constructor(private http: HttpClient) {
    }

    getAllLocations() {
        this.http.get<Location[]>(this.url).subscribe(data => {
                this.allYouthCentres = data;
            }, error1 => {
                console.log(error1);

            }
        );
    }





}
