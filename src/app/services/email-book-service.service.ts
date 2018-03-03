import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { EmailBook } from '../classes/email-book';

@Injectable()
export class EmailBookServiceService {
  private basePath: string = '/email-books';
  emailBooks: AngularFireList<EmailBook[]> = null; //  list of objects
  emailBook: AngularFireObject<EmailBook> = null;
  constructor(private db: AngularFireDatabase) { };

  /*getItemsList(query={}): AngularFireList<EmailBook[]> {
    this.emailBooks = this.db.list(this.basePath, {
      query: query
    });
    return this.emailBooks
  }*/

  getItem(key: string): AngularFireObject<EmailBook> {
    const itemPath =  `${this.basePath}/${key}`;
    this.emailBook = this.db.object(itemPath)
    return this.emailBook
  }

}
