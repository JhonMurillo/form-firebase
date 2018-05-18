import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {

  displayName: string
  photoURL:  string
  authState: any = null;
  constructor(public af: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
      this.displayName = this.af.auth.currentUser.displayName;
      this.photoURL = this.af.auth.currentUser.photoURL;
    });
  }

  signOut() {
    this.af.auth.signOut();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
