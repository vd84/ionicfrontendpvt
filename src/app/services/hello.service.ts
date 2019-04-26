import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHello} from '../Interfaces/hello';
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

    url = '//webbapppvt15grupp2.herokuapp.com/api/hello';

    constructor(private http: HttpClient) {
    }


    getAllHellos(): Observable<IHello[]> {
        return this.http.get<IHello[]>(this.url);


    }




}
