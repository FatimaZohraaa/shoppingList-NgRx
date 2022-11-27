import { Store } from '@ngrx/store';
import * as shoppinglistActions from './shopping-list.actions';
import * as shoppingListReducer from './shopping-list.reducer';

/**
 * no need to test actions as they're already tested with reducers and components
 * this is an example of testing addItem action
 */
describe('shoping list actions', () => {
  it('should dispatch addItem action', () => {
    const expectedAction = new shoppinglistActions.AddItem({
      name: 'new name',
      price: 5,
      id: 2,
    });
    const store = jasmine.createSpyObj<Store<shoppingListReducer.State>>(
      'store',
      ['dispatch']
    );
    store.dispatch(expectedAction);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
