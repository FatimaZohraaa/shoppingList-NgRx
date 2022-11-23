import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../../store/shopping-list.reducer';
import { Subscription } from 'rxjs';
import * as itemsListActions from '../../store/shopping-list.actions';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  private subscription: Subscription;
  itemsList: { name: string; price: number; id: number }[] = [];
  sum: number;
  private editedId: number = null;
  postsId: number[] = [];

  constructor(
    private store: Store<fromShoppingList.AppState>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new itemsListActions.get_items_start());

    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        this.itemsList = stateData.items;
        this.sum = stateData.items.reduce((prev, next) => prev + next.price, 0);
      });
  }

  onDelete(id: number) {
    console.log(id);
    this.store.dispatch(new itemsListActions.delete_item_start(id));
  }
  onClearAll() {
    this.postsId = this.itemsList.map((el) => el.id);

    this.postsId.forEach((id) => {
      this.http
        .delete(`http://localhost:3000/items/${id}`)
        .subscribe((state) => {
          this.store.dispatch(new itemsListActions.ClearAll());
        });
    });
  }

  onCalculateSum() {
    this.store.dispatch(new itemsListActions.CalculateSum());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit(id: number) {
    this.editedId = id;
  }

  editMode(id: number) {
    return id == this.editedId;
  }
  onSubmit(id: number) {
    this.store.dispatch(
      new itemsListActions.edit_item_start({
        name: this.editForm.controls.name.value,
        price: parseInt(this.editForm.controls.price.value),
        id: this.editedId,
      })
    );
    this.editedId = null;
  }
  onCancel() {
    this.editedId = null;
  }

  sumBackgroundColor() {
    if (this.sum < 30) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
