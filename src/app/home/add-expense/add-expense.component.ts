import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { Entry } from 'src/app/shared/entry.model';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  constructor(private modalCtrl: ModalController,private expenseService:ExpenseService) {}
  date;
  showDateTime=false;

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    expense: new FormControl(null,Validators.required),
    type: new FormControl(Validators.required)
  })

  ngOnInit() {}
  onClose() {
    this.modalCtrl.dismiss();
  }

  onPickDate(){
    this.showDateTime = true;
  }

  OnChange(date) {
    console.log(date)
    this.date = new Date(date);
    console.log(this.date);
    this.showDateTime=false;
  }


  addExpense(){
    console.log("In metho")
    const entry:Entry = {
      id: Math.random(),
      name: this.expenseForm.value.name,
      date: this.date,
      expense: this.expenseForm.value.expense,
      type: this.expenseForm.value.type
    }
    console.log(entry);
    this.expenseService.addEntry(entry);
    this.onClose();
  }

}
