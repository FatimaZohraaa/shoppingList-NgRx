import { Action } from '@ngrx/store';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const CLEAR_ALL = 'CLEAR_ALL';
export const CALCULATE_SUM = 'CALCULATE_SUM';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: { name: string; price: number }) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: number) {}
}

export class EditItem implements Action {
  readonly type = EDIT_ITEM;
  constructor(public payload: { name: string; price: number; index: number }) {}
}

export class ClearAll implements Action {
  readonly type = CLEAR_ALL;
}

export class CalculateSum implements Action {
  readonly type = CALCULATE_SUM;
}
export type itemsListActions =
  | AddItem
  | DeleteItem
  | EditItem
  | ClearAll
  | CalculateSum;
