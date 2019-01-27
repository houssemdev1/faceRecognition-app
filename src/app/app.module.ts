import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaceRecognitionService } from './face-recognition.service';
import { MheaderComponent } from './mheader/mheader.component';
import { MfooterComponent } from './mfooter/mfooter.component';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FaceComponent } from './home/face/face.component';
import { CamComponent } from './home/cam/cam.component';
import { CompareComponent } from './home/compare/compare.component';
import { LoginfaceComponent } from './home/loginface/loginface.component';
import { LoginwithfaceComponent } from './loginwithface/loginwithface.component';
import { Face2Component } from './home/face2/face2.component';
import { DatabaseComponent } from './database/database.component';
import { MainpageComponent } from './home/mainpage/mainpage.component';
import { FacedatabaseComponent } from './home/facedatabase/facedatabase.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FaceComponent,
    CamComponent,
    MheaderComponent,
    CompareComponent,
    MfooterComponent,
    LoginfaceComponent,
    LoginwithfaceComponent,
    Face2Component,
    DatabaseComponent,
    MainpageComponent,
    FacedatabaseComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireStorageModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    FaceRecognitionService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
