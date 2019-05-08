import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  url = 'https://webbapppvt15grupp2.herokuapp.com/userbadge/';

  constructor(private http: HttpClient) {
  }
  submitBadge(user: number, badge: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const body = JSON.stringify({
      user: user,
      badge: badge
    });

    this.http.post(this.url, body, httpOptions).subscribe(data => {
          console.log(data);
        },
        error => {
          console.log('Error');
        });


  }
}
