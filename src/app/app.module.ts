import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { routes } from './app.routes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { MaterializeModule } from "angular2-materialize";


export const firebaseConfig = {
  apiKey: "AIzaSyBuZZDWUEWeH7jcV5qoAJYKS9pbJI_wB-E",
  authDomain: "project-633b2.firebaseapp.com",
  databaseURL: "https://project-633b2.firebaseio.com",
  projectId: "project-633b2",
  storageBucket: "project-633b2.appspot.com",
  messagingSenderId: "104822146606"
};

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
})
export class MyOwnCustomMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MyOwnCustomMaterialModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    MaterializeModule,
  ],
  providers: [AuthGuard, AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
