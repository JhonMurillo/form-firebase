import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../classes/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-email-book',
  templateUrl: './email-book.component.html',
  styleUrls: ['./email-book.component.css']
})
export class EmailBookComponent implements OnInit {
  state: string = '';
  error: any;
  success: any;
  email;
  title: string = 'Accounts';
  users: Observable<Array<User>> = null;

  authState: any = null;
  constructor(public af: AngularFireAuth, private router: Router, private db: AngularFireDatabase, private userService: UserServiceService) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  ngOnInit() {
    this.users = this.userService.users;
    console.log(this.userService.users);
  }

}
