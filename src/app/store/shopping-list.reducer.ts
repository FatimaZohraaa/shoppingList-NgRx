import * as itemsListActions from './shopping-list.actions';

export interface State {
  items: itemsListActions.Item[];
  sum: number;
  errorMessage: string;
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
  errorMessage: '',
};

export function shoppingListReducer(
  state: State = initialState,
  action: itemsListActions.itemsListActions
) {
  switch (action.type) {
    /**
     * Gets items
     */
    case itemsListActions.GET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };

    /**
     * Addes an item
     */
    case itemsListActions.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    /**
     * Deletes an item
     */
    case itemsListActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    /**
     * Edits an item
     */
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

    /**
     * Clears all items
     */
    case itemsListActions.CLEAR_ALL:
      return {
        ...state,
        items: [],
      };

    case itemsListActions.GET_ITEMS_FAIL:
    case itemsListActions.DELETE_ITEM_FAIL:
    case itemsListActions.EDIT_ITEM_FAIL:
    case itemsListActions.ADD_ITEM_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case itemsListActions.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
}
