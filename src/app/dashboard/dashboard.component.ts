import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private auth1: AngularFireAuth) { }
  userid: string = '';
  useremail:string = '';


  ngOnInit(): void {
    this.auth1.authState.subscribe(user =>{
      if(user) this.userid = user.uid;
    })
  }

  
  logout(){
    this.auth.logout();
  }

}
