import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../Interfaces/user';
import {User} from '../../Models/User';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/api/user/';

    constructor(private http: HttpClient) {
    }

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);


    }
    getOneUser(id): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.url}${id}`);
    }

    getUserById(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);
    }


}

