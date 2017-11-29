
import { Component, NgModule } from '@angular/core';
import { HttpErrorResponse, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { PeopleService } from './people.service';


@Component({
  selector: 'my-app',
  template: `
	<div style="text-align:center">
	  <h1>
	    Listen to progress event
	  </h1>
	</div>

	<input type="file" #fileUpload>
	<button (click)="uploadAvatar(fileUpload)">Upload</button>

	<hr />

	<p *ngIf="output">
	  {{ output }}
	</p>

  `,
})


export class AppComponent {
  output;
  constructor(private peopleService: PeopleService) {}

  uploadAvatar(fileUpload) {
    const formData = new FormData();
    formData.append('avatar', fileUpload.files[0], 'avatar.jpg');

    this.peopleService
      .uploadAvatar(formData)
      .subscribe(res => {
        if (res.type === HttpEventType.UploadProgress) {
          const percentage = Math.round(100 * res.loaded / res.total);

          this.output = `File is ${percentage}% uploaded`;
        } else if (res instanceof HttpResponse) {
          this.output = `File is completely uploaded`;
        }
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
