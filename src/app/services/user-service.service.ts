import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../classes/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserServiceService {
  private basePath: string = '/users';
  users: Observable<any[]>; //  list of objects
  usersRef: AngularFireList<any>;
  user: AngularFireObject<User> = null;
  constructor(private db: AngularFireDatabase) {
   this.getUserList();
   
  };

  getUserList(query = {}){
    this.users = this.db.list('users').valueChanges();
  }

  getUser(key: string): AngularFireObject<User> {
    const itemPath = `${this.basePath}/${key}`;
    this.user = this.db.object(itemPath)
    return this.user
  }

}
