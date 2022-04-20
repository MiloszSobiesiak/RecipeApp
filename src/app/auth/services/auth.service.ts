import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

// login method
login(email : string, password : string) {
  this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');

      if(res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
       console.log("Dupa")
      }

  }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
  })
}

// register method
register(email : string, password : string) {
  this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
    alert('Registration Successful');
    this.sendEmailForVarification(res.user);
    this.router.navigate(['/login']);
  }, err => {
    alert(err.message);
    this.router.navigate(['/register']);
  })
}

// email varification
sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}

// sign out
logout() {
  this.fireauth.signOut().then( () => {
    window.localStorage.removeItem('token');
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }, err => {
    alert(err.message);
  })
}

isloggedin(){
  return !!localStorage.getItem('token');

}



}
