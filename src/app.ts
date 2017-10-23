import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
    
    <ul>
      <li *ngFor="let person of people">{{ person.name }}</li>
    </ul>
  `,
})

export class AppComponent {
  people$;
  constructor(private peopleService: PeopleService) {}

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

