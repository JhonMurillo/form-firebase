import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { ImageServiceService } from '../../services/image-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignUpComponent implements OnInit {
  authState: any = null;
  constructor(public af: AngularFireAuth, private router: Router,
    private db: AngularFireDatabase,
    private imageService: ImageServiceService) {
    this.af.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  state: string = '';
  error: any;
  success: any;
  email;
  password;
  name;
  phone;
  image: string = 'data:image/png;base64,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';
  title: string = 'Sign Up Now';
  gender: boolean = true

  onSubmit(formData) {
    if (formData.valid) {
      return this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
          this.success = 'User Registrer, verify your email ' + formData.value.email
          this.email = '';
          this.password = '';
          this.name = '';
          this.phone = '';
          var user: any = this.af.auth.currentUser;
          let genderText = this.gender ? 'male' : 'female'
          let photoUrl = 'https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/user-128.png'
          this.imageService.getImage(genderText)
            .subscribe(data => {
              photoUrl = data['results'][0].picture.medium
              console.log(data)
              console.log(photoUrl)
              user.updateProfile({
                displayName: formData.value.name,
                photoURL: photoUrl
              }).then(function () {
                user.sendEmailVerification().then(function () { });
              });
              setTimeout(() => this.success = '', 10000);
            });
        })
        .catch((err) => {
          this.error = err
          setTimeout(() => this.error = '', 10000);
        })
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
