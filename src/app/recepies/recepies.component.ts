import { Component, OnInit } from '@angular/core';
import { Nazwa, Recepie } from '../models/recepies';
import { AuthService } from '../auth/services/auth.service';
import { DataService } from '../auth/services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrls: ['./recepies.component.css']
})
export class RecepiesComponent implements OnInit {

  name: string = '';
  amount: string = '';
  unit: string = '';
  dishname: Nazwa = {
    name: ' ',
    category: ' '
  }

  recepie: Recepie = {
    name: '',
    amount: '',
    unit: '',
  }
  receplist: Nazwa [] = []
  namedish: string = ''
  categorydish:string = ''
  recepitems: Recepie[]=[]
  add:number = 0;
  preview: Recepie[] = [ ]
  userid: string = '';

  constructor(private auth: AuthService, private data: DataService, private auth1: AngularFireAuth) { 
    
  }

  ngOnInit() {
   this.getAllRecepies();
  }

  getAllRecepies() {
    this.data.getAllRecepies().subscribe(user =>{
    this.receplist = user as Nazwa[];
    this.receplist = Object.values(this.receplist)

    }, err => {
      alert('Error while fetching student data');
    })

  }
  addRecepie() {
    this.recepie.name = "Opis";
    this.recepie.amount = this.amount;
    this.dishname.name = this.namedish;
    this.dishname.category = this.categorydish;
    this.data.addRecepie(this.dishname, this.recepie)
    this.amount = '';
    this.name = '';
  }

  addIngredient(){
    this.recepie.name = this.name;
    this.recepie.amount = this.amount;
    this.recepie.unit = this.unit;
    this.dishname.name = this.namedish;
    this.preview.push(this.recepie)
    this.data.addIngredient(this.dishname, this.recepie)
    this.amount = '';
    this.name = '';
  }


  getRecepie(name:string){
    this.data.getRecepie(name).subscribe(user =>{
      this.recepitems = user as Recepie[];
      this.recepitems = Object.values(this.recepitems)
  
      }, err => {
        alert('Error while fetching student data');
      })
  }

}
