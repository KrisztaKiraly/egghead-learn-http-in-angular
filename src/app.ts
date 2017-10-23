//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PeopleService } from './people.service';

@Component({
  selector: 'my-app',
  template: `
    <div style="text-align:center">
      <h1>
        Fetch data from some API
      </h1>
    </div>
    
    <button (click)="fetchPeople()">Fetch people</button>
    
    <hr />
    
    <ul>
      <li *ngFor="let person of people$ | async">{{ person.name }}</li>
    </ul>
  `,
})
export class AppComponent {
  people$;
  constructor(private peopleService: PeopleService){}

  fetchPeople() {
    this.people$ = this.peopleService.fetchPeople();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ PeopleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }