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


    constructor(private http: HttpClient) {
    }


    getAllHellos(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);


    }
}

