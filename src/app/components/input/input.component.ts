import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as itemsListActions from '../../store/shopping-list.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @ViewChild('f') itemForm: NgForm;
  newItem: { name: string; price: number };
  constructor(
    private store: Store<{ shoppingList: { name: string; price: number }[] }>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.newItem = {
      name: this.itemForm.controls.itemName.value,
      price: parseInt(this.itemForm.controls.itemPrice.value),
    };
    this.store.dispatch(new itemsListActions.AddItem(this.newItem));
  }
}
