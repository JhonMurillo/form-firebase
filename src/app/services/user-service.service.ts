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
  u : User = null;
  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list<User>(this.basePath);
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ 
        $key: c.payload.key,
        user: this.u = c.payload.val()
        }));
    });
  };


  /* saveUser(user){
     this.db().ref('users/' + userId).set({
       username: name,
       email: email,
       profile_picture : imageUrl
     });
   }*/

  /*getUserListByEmail(email) {
    return this.db.list('users', ref => ref.orderByChild('email').equalTo('email')).valueChanges();
  }

  getUser(key: string): AngularFireObject<User> {
    const itemPath = `${this.basePath}/${key}`;
    this.user = this.db.object(itemPath)
    return this.user
  }*/

}
