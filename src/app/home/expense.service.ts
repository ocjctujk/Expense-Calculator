import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entry } from '../shared/entry.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private _entry : Entry[] = [
    {
      id: 1,
      date: new Date("2022-01-18"),
      name: "Income 1",
      expense: 5000,
      type: 'income'
    },
    {
      id: 2,
      date: new Date("2022-01-12"),
      name: "Expense 1",
      expense: 500,
      type: 'expense'
    },
    {
      id: 3,
      date: new Date("2021-02-18"),
      name: "Income 2",
      expense: 7000,
      type: 'income'
    },
    {
      id: 4,
      date: new Date("2021-02-18"),
      name: "Expense 2",
      expense: 700,
      type: 'expense'
    },
    {
      id: 5,
      date: new Date("2020-03-18"),
      name: "Income 3",
      expense: 6000,
      type: 'income'
    },
    {
      id: 6,
      date: new Date("2020-03-18"),
      name: "Expense 3",
      expense: 600,
      type: 'expense'
    }
  ]
  entrySubject = new BehaviorSubject<Entry[]>(this._entry);

  constructor() { }


  addEntry(entry:Entry){
    this._entry.push(entry);
    this.entrySubject.next(this._entry);
  }

  removeEntry(id: number){
    this._entry = this._entry.filter(entry=>{
      return entry.id != id;
    });
    this.entrySubject.next(this._entry);
  }

}
