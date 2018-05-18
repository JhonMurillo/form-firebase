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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmailBookComponent } from './components/email-book/email-book.component';
import { MessageComponent } from './components/message/message.component';
import { UserServiceService } from './services/user-service.service';
import { EmailBookServiceService } from './services/email-book-service.service';
import { ImageServiceService } from './services/image-service.service';


import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { AdminModule } from './admin/admin.module';


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
    MessageComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard, AngularFireAuth, AngularFireDatabase
    , UserServiceService
    , EmailBookServiceService, ImageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

