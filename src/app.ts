import { Component, NgModule } from '@angular/core';
import { HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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

    <pre>
      {{ output | json }}
    </pre>
  `,
})

export class AppComponent {
  output;
  constructor(private peopleService: PeopleService) {}

  fetchPeople() {
    this.peopleService
      .fetchPeople()
      .subscribe(data => {
        this.output = data;
      });
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
