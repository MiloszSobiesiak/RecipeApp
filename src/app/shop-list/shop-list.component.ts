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
  loadedplan: WeekDay [] = []
  loaded:WeekDay [] = [];
  loadedrecepie:Recepie[] = [];
  shoplist: shoplist[] = [];
  tonumber:number;
  ngOnInit(): void {
    this.load();
  }


  load(){
    let i = 0;
    this.week.forEach(day => {
      this.data.loadweekplan(day).subscribe(loadedday =>{
      this.loaded = loadedday as WeekDay[];
      this.loaded = Object.values(this.loaded)
      this.data.getRecepie(this.loaded[0].breakfast).subscribe(loadedrecepie =>{
        this.loadedrecepie = loadedrecepie as Recepie[];
        this.loadedrecepie = Object.values(this.loadedrecepie)
        this.loadedrecepie.forEach( items => {
          if(items.name === undefined){}
          else if(items.name==='Opis'){}
          else{
            let foo:shoplist = {}
            this.tonumber = + items.amount!
            foo[items.name]=this.tonumber
            this.shoplist.push(foo)
          }
        })
      })

          }, err => {
            alert('Error while fetching student data');
          })
      })
      console.log(this.shoplist)

        }
}
