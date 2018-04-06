import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { EmailBook } from '../classes/email-book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailBookServiceService {
  private basePath: string = '/emailBooks';
  emailBook: AngularFireObject<EmailBook> = null;
  emailBooks: Observable<any[]>; //  list of objects
  emailBooksRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.emailBooksRef = this.db.list<EmailBook>(this.basePath);
    this.emailBooks = this.emailBooksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  };

  saveEmailBook(emailBookSave) {
    this.emailBooksRef.push(emailBookSave)
  }

  getEmailBookByUserGuest(keyGuest) {
    this.emailBooksRef = this.db.list<EmailBook>(this.basePath,
      ref => ref.orderByChild('userGuest/key').equalTo(keyGuest)
    );
    return this.emailBooksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  getEmailBookByUserInvite(keyInvite) {
    this.emailBooksRef = this.db.list<EmailBook>(this.basePath,
      ref => ref.orderByChild('userInvite/key').equalTo(keyInvite)
    );
    return this.emailBooksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }


  /*getItemsList(query={}): AngularFireList<EmailBook[]> {
    this.emailBooks = this.db.list(this.basePath, {
      query: query
    });
    return this.emailBooks
  }*/

  getItem(key: string): AngularFireObject<EmailBook> {
    const itemPath = `${this.basePath}/${key}`;
    this.emailBook = this.db.object(itemPath)
    return this.emailBook
  }

}
