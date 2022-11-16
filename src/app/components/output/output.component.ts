import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../../store/shopping-list.reducer';
import { Subscription } from 'rxjs';
import * as itemsListActions from '../../store/shopping-list.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  private subscription: Subscription;
  itemsList: { name: string; price: number }[] = [];
  sum: number;
  private editedIndex: number = null;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        this.itemsList = stateData.items;
        this.sum = stateData.items.reduce((prev, next) => prev + next.price, 0);
      });
  }

  onDelete(index: number) {
    this.store.dispatch(new itemsListActions.DeleteItem(index));
  }
  onClearAll() {
    this.store.dispatch(new itemsListActions.ClearAll());
  }

  onCalculateSum() {
    this.store.dispatch(new itemsListActions.CalculateSum());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit(index: number) {
    this.editedIndex = index;
  }

  editMode(i: number) {
    return i == this.editedIndex;
  }
  onSubmit(i: number) {
    this.store.dispatch(
      new itemsListActions.EditItem({
        name: this.editForm.controls.name.value,
        price: parseInt(this.editForm.controls.price.value),
        index: i,
      })
    );
    this.editedIndex = null;
  }
  onCancel() {
    this.editedIndex = null;
  }

  sumBackgroundColor() {
    if (this.sum < 30) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
