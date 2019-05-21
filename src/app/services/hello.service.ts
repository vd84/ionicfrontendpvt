import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHello} from '../Interfaces/hello';
import {User} from '../Interfaces/user';

export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode'

}


@Injectable({
    providedIn: 'root'
})
export class HelloService {
    allUsers: Observable<IHello[]>;
    url = '//webbapppvt15grupp2.herokuapp.com/api/hello/';
    postUrl = '//webbapppvt15grupp2.herokuapp.com/addUser';

    constructor(private http: HttpClient) {
    }


    getAllHellos(): Observable<IHello[]> {
        return this.http.get<IHello[]>(this.url);


    }


    getOneHello(id): Observable<IHello> {
        return this.http.get<IHello>(`${this.url}${id}`);
    }
}

