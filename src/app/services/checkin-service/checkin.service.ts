import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CheckinService {

    youthUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinyouthcentre/';

    activityUrl = 'https://webbapppvt15grupp2.herokuapp.com/checkinactivity/';



    constructor(private http: HttpClient) {
    }

    youthcentreCheckin(userId: number, youthCentreId: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };
        const body = JSON.stringify({
            'userid': userId,
            'youthcentreid': youthCentreId,
        });

        this.http.post(this.youthUrl, body, httpOptions).subscribe(data => { // Saknar vad vi tar emot?
                console.log(data);
            },
            error => {
                console.log('Error');
            });


    }

    activityCheckin(userId: number, activityID: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

        };
        const body = JSON.stringify({
            'userid': userId,
            'activityid': activityID,
        });

        this.http.post(this.activityUrl, body, httpOptions).subscribe(data => { // Saknar vad vi tar emot?
                console.log(data);
            },
            error => {
                console.log('Error');
            });


    }

}

