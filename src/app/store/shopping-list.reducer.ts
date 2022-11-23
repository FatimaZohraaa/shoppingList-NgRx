import * as itemsListActions from './shopping-list.actions';

export interface State {
  items: { name: string; price: number; id: number }[];
  sum: number;
}

export interface AppState {
  shoppingList: State;
}

const initialItems: State['items'] = [
  { name: 'bag', price: 5, id: Math.random() },
  { name: 'shoes', price: 8, id: Math.random() },
  { name: 'shirt', price: 7, id: Math.random() },
  { name: 'dress', price: 5, id: Math.random() },
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
    case itemsListActions.GET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };

    case itemsListActions.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case itemsListActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case itemsListActions.EDIT_ITEM:
      const upgradedItem = {
        name: action.payload.name,
        price: action.payload.price,
        id: action.payload.id,
      };
      const upgradedItems = [...state.items];
      upgradedItems.forEach((el, index) => {
        if (el.id == action.payload.id) {
          upgradedItems[index] = upgradedItem;
        }
      });
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
