import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  url = 'https://webbapppvt15grupp2.herokuapp.com/checkinyouthcentre/';
  constructor(private http: HttpClient) {
  }
    checkin(userId: number, youthCentreId: number) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })

      };
      const body = JSON.stringify({
        'user': userId,
        'youthcentre': youthCentreId,
      });

      this.http.post(this.url, body, httpOptions).subscribe(data => { // Saknar vad vi tar emot?
            console.log(data);
          },
          error => {
            console.log('Error');
          });


    }
  }

