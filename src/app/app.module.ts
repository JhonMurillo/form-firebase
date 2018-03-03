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
import { MaterializeModule } from "angular2-materialize";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmailBookComponent } from './components/email-book/email-book.component';
import { MessageComponent } from './components/message/message.component';
import { UserServiceService } from './services/user-service.service';
import { EmailBookServiceService } from './services/email-book-service.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBuZZDWUEWeH7jcV5qoAJYKS9pbJI_wB-E",
  authDomain: "project-633b2.firebaseapp.com",
  databaseURL: "https://project-633b2.firebaseio.com",
  projectId: "project-633b2",
  storageBucket: "project-633b2.appspot.com",
  messagingSenderId: "104822146606"
};

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    ResetPasswordComponent,
    EmailBookComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    MaterializeModule,
  ],
  providers: [AuthGuard, AngularFireAuth, AngularFireDatabase
    , UserServiceService
    , EmailBookServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
