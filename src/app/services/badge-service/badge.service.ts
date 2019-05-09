import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Badge} from '../../Models/Badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  url = 'https://webbapppvt15grupp2.herokuapp.com/badge';

  constructor(private httpC: HttpClient) {}

  /**
   * Returnerar alla badges från apiet.
   */
    getAllBadges(): Observable<Badge[]> {
    return this.httpC.get<Badge[]>(this.url);
    }
}
