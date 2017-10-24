import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

export interface Person {
  name: string;
}

@Injectable()
export class PeopleService {

  constructor(private http: HttpClient) {}

  uploadAvatar(data): Observable<HttpEvent<Object>> {
    const req = new HttpRequest(
      'POST',
      'https://reqres.in/api/users/1',
      data,
      { reportProgress: true }
    );

    return this.http.request(req);
  }

}
