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
  public itemsList: itemsListActions.Item[] = [];
  public sum: number;
  private editedId: number = null;
  private postsId: number[] = [];

  constructor(
    private store: Store<fromShoppingList.AppState>,
    private http: HttpClient
  ) {}

  /**
   * When component is initialized
   * Gets the list of items from the server
   * stores the list in the local variable itemsList
   * Calculates the sum of prices
   */
  ngOnInit(): void {
    this.store.dispatch(new itemsListActions.get_items_start());

    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        this.itemsList = stateData.items;
        this.sum = stateData.items.reduce((prev, next) => prev + next.price, 0);
      });
  }

  /**
   * When delete button is clicked
   * Sends an action to delete the item from both the server and the ngrx store
   * @param id - id of the item to delete
   */
  onDelete(id: number) {
    this.store.dispatch(new itemsListActions.delete_item_start(id));
  }

  /**
   * When clear all button is clicked
   * Clears the item list on both the server and the ngrx store
   */
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * When edit button is clicked
   * Stores the ID of the element in editedId variable
   * @param id - id of the item to edit
   */
  onEdit(id: number) {
    this.editedId = id;
  }

  /**
   * If ID of the element is the ID to element to edit
   * Sets the editMode boolean to true or false
   * @param id - id of the item to edit
   * @returns a boolean
   */
  editMode(id: number) {
    return id == this.editedId;
  }

  /**
   * When save button is clicked
   * Edits the element's details on both the server and ngrx store
   * @param id - id of the item to edit
   */
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

  /**
   * When cancel button is clicked
   * Sets the editedId variable to null
   */
  onCancel() {
    this.editedId = null;
  }

  /**
   * Sets the background color of 'sum' to green if less than 30 and red otherwise
   * @returns a color
   */
  sumBackgroundColor() {
    if (this.sum < 30) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
