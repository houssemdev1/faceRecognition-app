import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, public afAuth: AngularFireAuth) { }

  doGoogleLogin(){

    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        console.log(res);
         if(res!=null){ this.router.navigate(["home"]);}

      })
    })
  }

  logout() {
    this.afAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}
