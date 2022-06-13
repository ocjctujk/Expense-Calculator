import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Entry } from '../shared/entry.model';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  constructor(private expenseService: ExpenseService,private modalCtrl:ModalController) {}
  @ViewChild('month') month;
  @ViewChild('year') year;
  total = 0;

  availableYears = [2022, 2021, 2020, 2019, 2018, 2017];
  expenses: Entry[];
  filteredExpense: Entry[];


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.expenseService.entrySubject.subscribe((entries) => {
      this.expenses = [...entries];
      this.filterData();
    });
    // this.filterData();
  }

  // Filtering Entries
  filterData() {
    const month = this.month.value;
    const year = this.year.value;
    this.filteredExpense = this.expenses.filter((expense) => {
      return (
        expense.date.getFullYear() == year && expense.date.getMonth() == month
      );
    });
    this.countTotal();
    this.sortExpenses()
  }

  addExpense(){
    this.modalCtrl.create({
      component: AddExpenseComponent,
    }).then(modal=>{
      modal.present();
    })
  }

  // Delete Entry
  deleteEntry(id: number) {
    this.expenseService.removeEntry(id);
  }

  countTotal(){
    let sum = 0;
    for(const expense of this.filteredExpense){
      if(this.isIncome(expense)){
        sum+=expense.expense;
      }
      else{
        sum-=expense.expense;
      }
    }
    this.total = sum;
  }
  isIncome(expense: Entry){
    if(expense.type==='income'){
      return true;
    }
    return false;
  }

  sortExpenses(){
    this.filteredExpense.sort(function(a,b){return b.date.getTime() - a.date.getTime()});
  }

}
