import { Component, OnInit } from '@angular/core';
import { DataService } from '../auth/services/data.service';
import { Recepie, shoplist, WeekDay } from '../models/recepies';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  constructor(private data: DataService) { }
  week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  meals = ['breakfast', 'work', 'lunch', 'dinner']
  loadedplan: WeekDay [] = []
  loaded:WeekDay [] = [];
  loadedrecepie:Recepie[] = [];
  shoplist: shoplist[] = [
    {name: '',
     number: 0 }
  ];
  tonumber:number;
  ngOnInit(): void {
    this.load();
  }


load(){
    let i = 0
      this.week.forEach(day => {
      this.data.loadweekplan(day).subscribe(loadedday =>{
      this.loaded = loadedday as WeekDay[];
      this.loaded = Object.values(this.loaded)
      let a = [this.loaded[0].breakfast, this.loaded[0].work, this.loaded[0].lunch, this.loaded[0].dinner]
      a.forEach(meal => {
      this.data.getRecepie(meal).subscribe(loadedrecepie =>{
        this.loadedrecepie = loadedrecepie as Recepie[];
        this.loadedrecepie = Object.values(this.loadedrecepie)
        this.loadedrecepie.forEach( items => {
          if(items.name === undefined ||items.name==='Opis' ){}
          else{
            this.tonumber = + items.amount!
            let zmienna: shoplist = {name: items.name, number: this.tonumber}
              for (let a= 0; a<=i; a++){
                if( this.shoplist[a].name === items.name){
                this.shoplist[a].number = this.shoplist[a].number +this.tonumber
                break
                }
                else if(a === i){
                this.shoplist.push(zmienna)
                i = i +1 
                break
                }
              }
            }
          })
        })
      })
    }, err => {
            alert('Error while fetching student data');
              })       
    })
  }      
}
