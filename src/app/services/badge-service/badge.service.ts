import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Badge} from '../../Models/Badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  url = 'https://webbapppvt15grupp2.herokuapp.com/badge/';

  constructor(private http: HttpClient) {}

  /**
   * Returnerar alla badges från apiet.
   */
    getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(this.url);
    }

  /**
   * Retunerar alla badges från en specifik user som identifieras med användarens id.
   * @param id: användarens id
   */
  getAllMyBadges(id): Observable<Badge[]> {
      return this.http.get<Badge[]>(this.url + id);
    }


}
