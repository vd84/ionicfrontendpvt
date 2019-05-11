import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/activity/';

    constructor(private http: HttpClient) {
    }

    /**
     * Returnerar alla aktiviteter från webbservern
     *
     */
    getAllActivities(): Observable<Event[]> {
        return this.http.get<Event[]>(this.url);
    }
}
