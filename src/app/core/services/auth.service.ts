import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afauth: AngularFireAuth) {}

  private signInWithEmailAndPassword({ email, password }): Promise<auth.UserCredential> {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmailAndPassword({ email, password, name }): Promise<auth.UserCredential> {
    return this.afauth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPoupUp(provider: string): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case 'facebook':
        signInProvider = new auth.FacebookAuthProvider();
        break;
    }

    return this.afauth.auth.signInWithPopup(signInProvider);
    }
  }
}
