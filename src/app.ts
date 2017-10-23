import { Component } from '@angular/core';
import { PeopleService } from './people.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
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
        console.log(data.headers.get('my-custom-header'));
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
