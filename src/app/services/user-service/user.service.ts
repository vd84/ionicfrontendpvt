import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../Interfaces/user';

export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode'

}


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




}

