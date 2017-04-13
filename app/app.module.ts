import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XHRBackend, HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HandsetListComponent } from './handset-list.component';
import { HandsetDetail } from './handset-detail.component';
import { MockXHRBackend } from './mock-xhr-backend';


import {DataHandling} from './data-handling.service'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HandsetListComponent,
    HandsetDetail,
  
  ],
  providers:[
    DataHandling,
    {provide: XHRBackend, useClass:MockXHRBackend}
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
