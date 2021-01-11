import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { AddEmployeeProfileComponent } from './components/addEmployeeProfile/addEmployeeProfile.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeProfileComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
