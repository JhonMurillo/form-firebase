import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { UserServiceService } from '../../services/user-service.service';
import { EmailBookServiceService } from '../../services/email-book-service.service';
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
  userAgg: User = new User();
  emailCurrent;
  title: string = 'Accounts';
  users: Observable<Array<User>> = null;
  emailBooksGuest: Observable<Array<EmailBook>> = null;
  emailBooksInvite: Observable<Array<EmailBook>> = null;
  emailBook: EmailBook = new EmailBook();
  usersAux: Map<string, User>;
  elementInput: Object;
  checkbox: boolean = true
  emailSend : string 

  authState: any = null;
  constructor(public af: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private userService: UserServiceService,
    private emailBookService: EmailBookServiceService) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  onLoadAutoComplete(context) {
    $('input.autocomplete').autocomplete({
      data: this.elementInput,
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function (val) {
        context.userAgg = context.usersAux.get(val);
        if (context.userAgg.name === null || context.userAgg.name === undefined) {
          context.userAgg.emailVerified = false;
        } else {
          context.userAgg.emailVerified = true
        }
        if (!context.userAgg.emailVerified) {
          toast('!User Not Verified ' + val, 3000, 'rounded')
          $('input.autocomplete').val('');
          context.userAgg = new User();
          $('#btn-agg').addClass('disabled')
        } else {
          let guest = [], invite = []
          context.emailBooksGuest.forEach((element, index, array) => {
            guest.push(element.filter(a => a.userInvite.email === val))
          });

          context.emailBooksInvite.forEach((element, index, array) => {
            invite.push(element.filter(a => a.userGuest.email === val))
            if (array === undefined || index === array.length - 1) {
              context.validList(guest, invite, val)
            }
          });
        }
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    }, this);
  }

  validList(guest, invite, val) {
    if (guest.length !== 0 || invite.length !== 0) {
      $('#btn-agg').addClass('disabled')
      toast('!User already register. ' + val, 3000, 'rounded')
      $('input.autocomplete').val('');
      this.userAgg = new User();
    } else {
      $('#btn-agg').removeClass('disabled')
    }
  }

  onSaveEmailBook() {
    this.emailBook.accepted = false;
    this.emailBook.invited = false;
    this.emailBook.date = new Date();
    this.emailBook.userGuest = new User()
    this.emailBook.userGuest.key = this.af.auth.currentUser.uid;
    this.emailBook.userGuest.name = this.af.auth.currentUser.displayName;
    this.emailBook.userGuest.email = this.af.auth.currentUser.email;
    this.emailBook.userInvite = new User()
    this.emailBook.userInvite.key = this.userAgg.$key;
    this.emailBook.userInvite.name = this.userAgg.name;
    this.emailBook.userInvite.email = this.userAgg.email;
    this.emailBookService.saveEmailBook(this.emailBook)
    toast('!User Agg ' + this.userAgg.email, 3000, 'rounded')
    $('#btn-agg').addClass('disabled')
    $('#btn-sendinv').addClass('disabled')
    $('input.autocomplete').val('');
    this.userAgg = new User();
  }

  onSendInvEmailBook(data) {
    toast('!Invitation send to ' + data, 3000, 'rounded')
    this.emailSend = ''
  }

  ngOnInit() {
    $('#btn-agg').addClass('disabled')
    $('#btn-sendinv').addClass('disabled')
    this.userAgg = new User();
    this.emailCurrent = this.af.auth.currentUser.email;
    this.users = this.userService.users;
    this.emailBooksGuest = this.emailBookService.getEmailBookByUserGuest(this.af.auth.currentUser.uid)
    this.emailBooksInvite = this.emailBookService.getEmailBookByUserInvite(this.af.auth.currentUser.uid)
    this.elementInput = {};
    this.usersAux = new Map();
    this.users.forEach(element => {
      element.forEach(user => {
        if (user.email !== this.emailCurrent) {
          this.elementInput[user.email] = null;
          this.usersAux.set(user.email, user);
        }
      });
      this.onLoadAutoComplete(this);
    });

  }





}
