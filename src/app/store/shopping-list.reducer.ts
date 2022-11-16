import * as itemsListActions from './shopping-list.actions';

export interface State {
  items: { name: string; price: number }[];
  sum: number;
}

export interface AppState {
  shoppingList: State;
}

const initialItems: State['items'] = [
  { name: 'bag', price: 5 },
  { name: 'shoes', price: 8 },
  { name: 'shirt', price: 7 },
  { name: 'dress', price: 5 },
];

const initialState: State = {
  items: initialItems,
  sum: initialItems.reduce((prev, next) => prev + next.price, 0),
};

export function shoppingListReducer(
  state: State = initialState,
  action: itemsListActions.itemsListActions
) {
  switch (action.type) {
    case itemsListActions.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case itemsListActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      };

    case itemsListActions.EDIT_ITEM:
      const upgradedItem = {
        name: action.payload.name,
        price: action.payload.price,
      };
      const upgradedItems = [...state.items];
      upgradedItems[action.payload.index] = upgradedItem;

      return {
        ...state,
        items: upgradedItems,
      };

    case itemsListActions.CLEAR_ALL:
      return {
        ...state,
        items: [],
      };

    case itemsListActions.CALCULATE_SUM:
      return {
        ...state,
        sum: state.items.reduce((prev, next) => prev + next.price, 0),
      };
    default:
      return state;
  }
}
