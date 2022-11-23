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

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: { name: string; price: number; id: number }) {}
}

export class add_item_start implements Action {
  readonly type = ADD_ITEM_START;
  constructor(public payload: { name: string; price: number; id: number }) {}
}

export class add_item_fail implements Action {
  readonly type = ADD_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: number) {}
}

export class delete_item_start implements Action {
  readonly type = DELETE_ITEM_START;
  constructor(public payload: number) {}
}

export class delete_item_fail implements Action {
  readonly type = DELETE_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

export class EditItem implements Action {
  readonly type = EDIT_ITEM;
  constructor(public payload: { name: string; price: number; id: number }) {}
}

export class edit_item_start implements Action {
  readonly type = EDIT_ITEM_START;
  constructor(public payload: { name: string; price: number; id: number }) {}
}

export class edit_item_fail implements Action {
  readonly type = EDIT_ITEM_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

export class GetItems implements Action {
  readonly type = GET_ITEMS;
  constructor(public payload: { name: string; price: number; id: number }[]) {}
}

export class get_items_start implements Action {
  readonly type = GET_ITEMS_START;
  // constructor(public payload: { name: string; price: number; id: number }[]) {}
}

export class get_items_fail implements Action {
  readonly type = GET_ITEMS_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

export class ClearAll implements Action {
  readonly type = CLEAR_ALL;
}

export class clear_all_start implements Action {
  readonly type = CLEAR_ALL_START;
  constructor(public payload: number[]) {}
}

export class clear_all_fail implements Action {
  readonly type = CLEAR_ALL_FAIL;
  constructor(public payload: string) {}
}

/////////////////////////////////////////////////////////

export class CalculateSum implements Action {
  readonly type = CALCULATE_SUM;
}

export type itemsListActions =
  | AddItem
  | DeleteItem
  | EditItem
  | ClearAll
  | CalculateSum
  | add_item_start
  | add_item_fail
  | delete_item_start
  | delete_item_fail
  | edit_item_start
  | edit_item_fail
  | GetItems
  | get_items_start
  | get_items_fail
  | clear_all_start
  | clear_all_fail;
