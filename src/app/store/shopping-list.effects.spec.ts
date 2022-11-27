import { Observable } from 'rxjs';
import * as shoppinglistActions from './shopping-list.actions';
import * as shoppingListReducer from './shopping-list.reducer';
import { ShoppingListEffect } from './shopping-list.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { HttpClientModule } from '@angular/common/http';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';

describe('shopping list effects', () => {
  let actions: Observable<any>;
  let effects: ShoppingListEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ShoppingListEffect,
        provideMockActions(() => actions),
        //
      ],
    });

    effects = TestBed.get(ShoppingListEffect);
  });

  //   it('should return a stream with AddItem action', () => {
  //     const newItem: shoppinglistActions.Item = { name: 'new', price: 5, id: 6 };
  //     const action : shoppinglistActions.itemsListActions= new shoppinglistActions.add_item_start(newItem);
  //     const outcome : shoppinglistActions.itemsListActions= new shoppinglistActions.AddItem(newItem);

  //     actions = hot('-a', { a: action });
  //     const response = cold('-a|', { a: newItem });
  //     const expected = cold('--b', { b: outcome });

  //     console.log(expected);
  //     expect(effects.addItem$).toBeObservable(expected);
  //   });

  it('should return a stream with DeleteItem action', () => {});

  it('should return a stream with EditItem action', () => {});

  it('should return a stream with getItems action', () => {});
});
