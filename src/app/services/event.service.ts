
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';

const API_URL=environment.BASE_URL+'/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEventList(): Observable<any> {
    return this.http.get(API_URL+'/get');
  }

  getScheduleList(): Observable<any> {
    return this.http.get(API_URL+'/getSchedule');
  }

  saveEvent(event:Event): Observable<Event> {
    return this.http.post<Event>(API_URL+'/save',event);
  }
}
