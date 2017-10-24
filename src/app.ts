//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyHttpLogInterceptor } from './http.interceptor';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Testing the new Angular HttpClient</h2>
    </div>
    
    <p>Open the devtools console and inspect the interceptor output there</p>
    
    <button (click)="fetchPeople()">Fetch people</button>
    <button (click)="raiseHttpError()">Raise http error</button>
    
    <hr />
    
    List of people
      
    <ul>
      <li *ngFor="let person of people$ | async">{{ person.name }}</li>
    </ul>
  `,
})
export class App {
  people$;
  
  constructor(private http: HttpClient) {
  }
  
  fetchPeople() {
    this.people$ = this.http
      .get('./data/people.json');
  }
  
  raiseHttpError() {
    this.people$ = this.http
      .get('./data/unavailableendpoint.json');
  }
}

@NgModule({
  imports: [ BrowserModule, HttpClientModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }  
  ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}