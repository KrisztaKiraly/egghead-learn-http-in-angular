import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { Http, Response } from '@angular/http';

import { AppComponent } from './app.component';
import { MyLogHttpInterceptor } from './http.interceptor';


@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Testing the new Angular HttpClient</h2>
    </div>

    <button (click)="fetchPeople()">Fetch people</button>
    <button (click)="raiseHttpError()">Raise http error</button>

    <hr />

    List of people

    <ul>
      <li *ngFor="let person of people | async">{{ person.name }}</li>
    </ul>
  `
})
export class AppComponent {
  people;

  constructor(private http: HttpClient) { }

  fetchPeople() {
    this.people = this.http.get('/data/people.json');
  }

  raiseHttpError() {
    this.people = this.http.get('/assets/data/unavailableendpoint.json');
  }
}


@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyLogHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
