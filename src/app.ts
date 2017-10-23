import { Component, NgModule } from '@angular/core';
import { PeopleService } from './people.service';
import { HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';


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



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  people;
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
  }
}



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