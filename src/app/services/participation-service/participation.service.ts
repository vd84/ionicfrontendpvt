import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {log} from 'util';

@Injectable({
    providedIn: 'root'
})
export class ParticipationService {

    url = 'https://webbapppvt15grupp2.herokuapp.com/participation/';

    constructor(private http: HttpClient) {
    }

    submitParticipation(user: number, activity: number) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            user: user,
            activity: activity
        });

        this.http.post(this.url, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }
}
