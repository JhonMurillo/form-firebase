import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignUpComponent implements OnInit {
  authState: any = null;
  constructor(public af: AngularFireAuth, private router: Router,private db: AngularFireDatabase) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  
  state: string = '';
  error: any;
  email = 'jhonma16@hotmail.com';
  password;
  title: string = 'Sign Up Now';

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      return this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
          this.error = 'User Registrer'
        })
        .catch(err => this.error = err);
    }
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  private updateUserData(): void {
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  ngOnInit() {
  }

}
