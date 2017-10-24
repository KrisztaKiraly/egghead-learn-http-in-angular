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
  <!--
  <pre>
    {{ output | json }}
  </pre>
  -->

  `,
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  output;
  constructor(private peopleService: PeopleService) {}

  fetchPeople() {
    this.peopleService
      .fetchPeople()
      .subscribe(data => {
        /* Custom headers can't be set in plunker
           Clone: https://github.com/eggheadio-projects/egghead-learn-http-in-angular/tree/read-custom-headers
           to see behavior in local development
        */
        console.log("Date Header Observerd:",data.headers.get('date'));
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
