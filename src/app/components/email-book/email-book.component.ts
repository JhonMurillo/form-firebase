import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../classes/user';
import { EmailBook } from '../../classes/email-book';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any;
declare var $: any;
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-email-book',
  templateUrl: './email-book.component.html',
  styleUrls: ['./email-book.component.css']
})
export class EmailBookComponent implements OnInit {
  state: string = '';
  error: any;
  userAgg: string;
  emailCurrent;
  title: string = 'Accounts';
  users: Observable<Array<User>> = null;
  emailBook: EmailBook = new EmailBook();
  usersAux: Map<string, boolean>;
  elementInput: Object;

  authState: any = null;
  constructor(public af: AngularFireAuth, private router: Router, private db: AngularFireDatabase, private userService: UserServiceService) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  onLoadAutoComplete(context) {
    $('input.autocomplete').autocomplete({
      data: this.elementInput,
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function (val) {
        context.elementInput;
        var verified = context.usersAux.get(val);
        if (!verified) {
          toast('!User Not Verified ' + val, 3000, 'rounded')
          $('input.autocomplete').val('');
        }
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    },this);
  }

  onSaveEmailBook(formData){
    this.emailBook.accepted = false;
    this.emailBook.invited = false;
    this.emailBook.userGuest.uid = this.af.auth.currentUser.uid;
    this.emailBook.userGuest.name = this.af.auth.currentUser.displayName;
    this.emailBook.userGuest.email = this.af.auth.currentUser.email;
    this.emailBook.userGuest.emailVerified = this.af.auth.currentUser.emailVerified;
    console.log(this.emailBook)
    let user = this.userService.getUserListByEmail(this.userAgg);
    console.log(user);
  }

  ngOnInit() {
    this.emailCurrent = this.af.auth.currentUser.email;
    this.users = this.userService.users;
    this.elementInput = {};
    this.usersAux = new Map();
    var index = 0;
    this.users.forEach(element => {
      element.forEach(user => {
        if (user.email !== this.emailCurrent) {
          this.elementInput[user.email] = null;
          this.usersAux.set(user.email, user.name === null || user.name === undefined ? false : true);
          index++;
        }
      });
      this.onLoadAutoComplete(this);
    });

  }





}
