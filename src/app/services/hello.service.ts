import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHello} from '../Interfaces/hello';
import {RequestOptions} from '@angular/http';
import {IUser} from '../Interfaces/user';

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

    url = '//webbapppvt15grupp2.herokuapp.com/api/hello/';

    constructor(private http: HttpClient) {
    }


    getAllHellos(): Observable<IHello[]> {
        return this.http.get<IHello[]>(this.url);


    }


    submitUser(id: number, username: string) {
        this.http.post(this.url, {'id': id, 'message': username});
    }

    getHelloById(id): Observable<IHello> {
        return this.http.get<IHello>(`${this.url}${id}`);
    }
}
