import { Component, OnInit } from '@angular/core';
import { WeekDay } from '../models/recepies';
import { DataService } from '../auth/services/data.service';
import { Nazwa } from '../models/recepies';

@Component({
  selector: 'app-week-plan',
  templateUrl: './week-plan.component.html',
  styleUrls: ['./week-plan.component.css']
})
export class WeekPlanComponent implements OnInit {


weekdays: WeekDay[] = [
  {day: "Monday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Tuesday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Wednesday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Thursday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Friday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Saturday", breakfast: '', work :'', lunch :'', dinner: ''},
  {day: "Sunday", breakfast: '', work :'', lunch :'', dinner: ''}
]
receplist: Nazwa [] = []
loadedplan: WeekDay []=[]

  constructor(private data: DataService,) { }

  ngOnInit(): void {
    this.getAllRecepies();
    this.load();
  }

  getAllRecepies() {
    this.data.getAllRecepies().subscribe(user =>{
    this.receplist = user as Nazwa[];
    this.receplist = Object.values(this.receplist)

    }, err => {
      alert('Error while fetching student data');
    })

  }

  save(){
    this.weekdays.forEach(day => {
      this.data.saveweekplan(day)
    });
  }

  load(){
    this.weekdays.forEach(day => {
    this.data.loadweekplan(day.day).subscribe(loadedday =>{
        this.loadedplan = loadedday;
        this.loadedplan = Object.values(this.loadedplan)
        day.breakfast = this.loadedplan[0].breakfast
        day.work = this.loadedplan[0].work
        day.lunch = this.loadedplan[0].lunch
        day.dinner = this.loadedplan[0].dinner
          }, err => {
            alert('Error while fetching student data');
          })
      
    });
    
  }

  clear(){
    this.weekdays.forEach(day => {
        this.data.clearweekplan(day.day)
        day.breakfast = ''
        day.work = ''
        day.lunch = ''
        day.dinner = ''
    })
  }
}
