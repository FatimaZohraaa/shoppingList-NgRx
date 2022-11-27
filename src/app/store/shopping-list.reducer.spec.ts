import * as shoppingListReducer from './shopping-list.reducer';
import * as shoppingListActions from './shopping-list.actions';

describe('shopping list reducer', () => {
  let initialState: shoppingListReducer.State;
  type Item = { name: string; price: number; id: number };

  beforeEach(() => {
    initialState = shoppingListReducer.initialState;
  });

  it('should return init state', () => {
    //given
    const noopAction: shoppingListActions.itemsListActions =
      new shoppingListActions.Noop();
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(undefined, noopAction);

    //then
    expect(newState).toEqual(initialState);
  });

  it('should add item', () => {
    //given
    const initialNumberItems: number = initialState.items.length;
    const newItem: Item = {
      name: 'new',
      price: 4,
      id: 6,
    };
    const addAction: shoppingListActions.itemsListActions =
      new shoppingListActions.AddItem(newItem);
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, addAction);

    //then
    expect(newState.items.indexOf(newItem)).not.toEqual(-1);
    expect(newState.items.length).toEqual(initialNumberItems + 1);
  });

  it('should delete an item', () => {
    //given
    const itemDelete: Item = initialState.items[0];
    const idDelete: number = itemDelete.id;
    const deleteAction: shoppingListActions.itemsListActions =
      new shoppingListActions.DeleteItem(idDelete);
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, deleteAction);

    //then
    expect(newState.items.indexOf(itemDelete)).toEqual(-1);
  });

  it('should edit item', () => {
    expect(initialState.items[0].name).not.toEqual('edit name');

    //given
    const editAction: shoppingListActions.itemsListActions =
      new shoppingListActions.EditItem({
        ...initialState.items[0],
        name: 'edit name',
      });
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, editAction);

    //then
    expect(newState.items[0].name).toEqual('edit name');
  });

  it('should get items', () => {
    //given
    const getItemsAction: shoppingListActions.itemsListActions =
      new shoppingListActions.GetItems([{ name: 'new item', price: 5, id: 9 }]);
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, getItemsAction);

    //then
    expect(newState.items.length).toEqual(1);
  });

  it('should clear all items', () => {
    //given
    const clearAllAction: shoppingListActions.itemsListActions =
      new shoppingListActions.ClearAll();
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, clearAllAction);

    //then
    expect(newState.items.length).toEqual(0);
  });

  it('should clear error message', () => {
    //given
    const clearErrorMessage: shoppingListActions.itemsListActions =
      new shoppingListActions.ClearErrorMessage();
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, clearErrorMessage);

    //then
    expect(newState.errorMessage).toEqual('');
  });

  it('should add an error message for get request failure', () => {
    //given
    const getItemsFail: shoppingListActions.itemsListActions =
      new shoppingListActions.get_items_fail('error message');
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, getItemsFail);

    //then
    expect(newState.errorMessage).toEqual('error message');
  });

  it('should add an error message for delete item failure', () => {
    //given
    const getItemsFail: shoppingListActions.itemsListActions =
      new shoppingListActions.delete_item_fail('error message');
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, getItemsFail);

    //then
    expect(newState.errorMessage).toEqual('error message');
  });

  it('should add an error message for edit item failure', () => {
    //given
    const getItemsFail: shoppingListActions.itemsListActions =
      new shoppingListActions.edit_item_fail('error message');
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, getItemsFail);

    //then
    expect(newState.errorMessage).toEqual('error message');
  });

  it('should add an error message for add item failure', () => {
    //given
    const getItemsFail: shoppingListActions.itemsListActions =
      new shoppingListActions.add_item_fail('error message');
    const newState: shoppingListReducer.State =
      shoppingListReducer.shoppingListReducer(initialState, getItemsFail);

    //then
    expect(newState.errorMessage).toEqual('error message');
  });
});
