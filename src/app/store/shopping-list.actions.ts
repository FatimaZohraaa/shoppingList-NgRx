import { Action } from '@ngrx/store';

export const ADD_ITEM = '[shopping-list] add item';
export const ADD_ITEM_START = '[shopping-list] add item start';
export const ADD_ITEM_FAIL = '[shopping-list] add item fail';

export const DELETE_ITEM = '[shopping-list] delete item';
export const DELETE_ITEM_START = '[shopping-list] delete item start';
export const DELETE_ITEM_FAIL = '[shopping-list] delete item fail';

export const EDIT_ITEM = '[shopping-list] edit item';
export const EDIT_ITEM_START = '[shopping-list] edit item start';
export const EDIT_ITEM_FAIL = '[shopping-list] edit item fail';

export const GET_ITEMS = '[shopping-list] get items';
export const GET_ITEMS_START = '[shopping-list] get items start';
export const GET_ITEMS_FAIL = '[shopping-list] get items fail';

export const CLEAR_ALL = '[shopping-list] clear all';
export const CLEAR_ALL_START = '[shopping-list] clear all start';
export const CLEAR_ALL_FAIL = '[shopping-list] clear all fail';

export const CALCULATE_SUM = '[shopping-list] calculate sum';

/////////////////////////////////////////////////////////
export type Item = { name: string; price: number; id: number };

/**
 * Adds the new item item to the list in the ngrx store
 */
export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: Item) {}
}

/**
 * Sends the new item to the addItem effect to add to the server
 */
export class add_item_start implements Action {
  readonly type = ADD_ITEM_START;
  constructor(public payload: Item) {}
}

/**
 * Returns the error from the http post request
 */
export class add_item_fail implements Action {
  readonly type = ADD_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

/**
 * Deletes an item from the ngrx store
 */
export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: number) {}
}

/**
 * Sends the ID of the item to delete to the deleteItem effect to delete from the server
 */
export class delete_item_start implements Action {
  readonly type = DELETE_ITEM_START;
  constructor(public payload: number) {}
}

/**
 * Returns the error from the http delete request 

 */
export class delete_item_fail implements Action {
  readonly type = DELETE_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

/**
 * Edits the item in the ngrx store
 */
export class EditItem implements Action {
  readonly type = EDIT_ITEM;
  constructor(public payload: Item) {}
}

/**
 * Sends the item to edit to the editItem effect to edit on the server
 */
export class edit_item_start implements Action {
  readonly type = EDIT_ITEM_START;
  constructor(public payload: Item) {}
}

/**
 * Returns the error from the http patch request
 */
export class edit_item_fail implements Action {
  readonly type = EDIT_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

/**
 * Sets the itemsList in the ngrx store to the list of items obtained from the server
 */
export class GetItems implements Action {
  readonly type = GET_ITEMS;
  constructor(public payload: Item[]) {}
}

/**
 * Gets all items from the server via the getItems effect
 */
export class get_items_start implements Action {
  readonly type = GET_ITEMS_START;
  // constructor(public payload: Item[]) {}
}

/**
 * Returns the error from the http get request
 */
export class get_items_fail implements Action {
  readonly type = GET_ITEMS_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

/**
 * Clears all items from the list in the ngrx store
 */
export class ClearAll implements Action {
  readonly type = CLEAR_ALL;
}

// export class clear_all_start implements Action {
//   readonly type = CLEAR_ALL_START;
//   constructor(public payload: number[]) {}
// }

// export class clear_all_fail implements Action {
//   readonly type = CLEAR_ALL_FAIL;
//   constructor(public payload: string) {}
// }

/////////////////////////////////////////////////////////

export type itemsListActions =
  | AddItem
  | DeleteItem
  | EditItem
  | ClearAll
  | add_item_start
  | add_item_fail
  | delete_item_start
  | delete_item_fail
  | edit_item_start
  | edit_item_fail
  | GetItems
  | get_items_start
  | get_items_fail;
// | clear_all_start
// | clear_all_fail;
