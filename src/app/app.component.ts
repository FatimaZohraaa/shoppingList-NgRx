import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import { Subscription } from 'rxjs';
import * as itemsListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shoppingList-ngrx';
  private subscription: Subscription;
  errorMessage: string = '';
  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        this.errorMessage = stateData.errorMessage;
        if (this.errorMessage.length !== 0) {
          alert(this.errorMessage);
          this.store.dispatch(new itemsListActions.ClearErrorMessage());
        }
      });
  }
}
