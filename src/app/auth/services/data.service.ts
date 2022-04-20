import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Nazwa, Recepie,WeekDay } from 'src/app/models/recepies';
import { tap } from 'rxjs';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  userid: string = '';

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this.auth.authState.subscribe(user =>{
      if(user) this.userid = user.uid;
    })
   }


  getAllRecepies() {
    return this.http.get('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/Recepies/list.json').pipe(tap(console.log))
  }

  addRecepie(zmienna: Nazwa ,recepie : Recepie) {
    this.adddishtolist(zmienna)
    return this.http.post('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/Recepies/'+zmienna.name+'.json', recepie ).subscribe(responseData => {
      console.log(responseData);
    });
    
   }
   adddishtolist(nazwa: Nazwa){
     console.log("Dodaje do listy elo")
    return this.http.post('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/Recepies/list.json', nazwa ).subscribe(responseData => {
      console.log(responseData);
    });
   }

   getRecepie(name: string){
    return this.http.get('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/Recepies/'+name+'.json')
   }

   addIngredient(zmienna: Nazwa ,recepie : Recepie){
    return this.http.post('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/Recepies/'+zmienna.name+'.json', recepie ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  saveweekplan(day:WeekDay){
    return this.http.post('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/WeekPlan/'+day.day+'.json', day ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  loadweekplan(day:string){
    return this.http.get('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/WeekPlan/'+day+'.json').pipe(tap(console.log))
  }
  
  clearweekplan(day:string){
    console.log("usuwam?", day)
    return this.http.delete('https://homeapp-8e8f9-default-rtdb.europe-west1.firebasedatabase.app/'+this.userid+'/WeekPlan/'+day+'.json').subscribe()
  }
    
}
