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
    
    <p *ngIf="message">
      <strong>Error: </strong> {{ message }}
    </p>
  `,
})

export class AppComponent {
  people$;
  message;
  constructor(private peopleService: PeopleService) {}

  fetchPeople() {
    this.peopleService
      .fetchPeople()
      .subscribe(
        (data) => {
          this.message = null;
          this.people = data;
        },
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            // client-side error
            this.message = `An error occured ${err.error.message}`;
          } else {
            this.message = `Backend returned error code ${err.status}, body was: ${err.message}`;
          }
        }
      );
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