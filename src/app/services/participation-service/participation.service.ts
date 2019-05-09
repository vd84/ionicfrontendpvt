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

    submitParticipation(userID: number, activityID: number) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        const body = JSON.stringify({
            user: userID,
            activity: activityID
        });

        this.http.post(this.url, body, httpOptions).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log('Error');
            });

    }
}
