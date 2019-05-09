import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Badge} from '../../Models/badge';
import {UserBadge} from '../../Models/UserBadge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  // Använd denna URL för userbadge tabellen
  urlUserBadge = 'https://webbapppvt15grupp2.herokuapp.com/userbadge/';
  // Använd denna URL för badge tabellen
  urlBadge = 'https://webbapppvt15grupp2.herokuapp.com/badge/';

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

    this.http.post(this.urlUserBadge, body, httpOptions).subscribe(data => {
          console.log(data);
        },
        error => {
          console.log('Error');
        });


  }
  getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(this.urlBadge);
  }
  getAllUserBadges(): Observable<UserBadge[]> {
    return this.http.get<UserBadge[]>(this.urlUserBadge);
  }
}
