import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as ShoppingListActions from './shopping-list.actions';
import { createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
export interface ShoppingListData {
  name: string;
  price: number;
  id: number;
}

@Injectable()
export class ShoppingListEffect {
  /**
   * Sends an http post request to add a new item to the server
   */

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.ADD_ITEM_START),
      switchMap((shoppingListData: ShoppingListActions.add_item_start) => {
        return this.http
          .post<ShoppingListData>('http://localhost:3000/items', {
            name: shoppingListData.payload.name,
            price: shoppingListData.payload.price,
            id: shoppingListData.payload.id,
          })
          .pipe(
            map((resData) => {
              return new ShoppingListActions.AddItem({
                name: resData.name,
                price: resData.price,
                id: resData.id,
              });
            }),
            catchError((errorRes) => {
              return of(
                new ShoppingListActions.add_item_fail(errorRes.message)
              );
            })
          );
      })
    )
  );

  /**
   * Sends an http delete request to delete an item from the server
   */

  deleteItem = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.DELETE_ITEM_START),
      switchMap((shoppingListData: ShoppingListActions.delete_item_start) => {
        return this.http
          .delete<ShoppingListData>(
            `http://localhost:3000/items/${shoppingListData.payload}`
          )
          .pipe(
            map((resData) => {
              return new ShoppingListActions.DeleteItem(
                shoppingListData.payload
              );
            }),
            catchError((errorRes) => {
              return of(
                new ShoppingListActions.delete_item_fail(errorRes.message)
              );
            })
          );
      })
    )
  );

  /**
   * Sends an http patch request to edit an item on the server
   */
  editItem = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.EDIT_ITEM_START),
      switchMap((shoppingListData: ShoppingListActions.edit_item_start) => {
        return this.http
          .patch<ShoppingListData>(
            `http://localhost:3000/items/${shoppingListData.payload.id}`,
            {
              name: shoppingListData.payload.name,
              price: shoppingListData.payload.price,
            }
          )
          .pipe(
            map((resData) => {
              return new ShoppingListActions.EditItem(shoppingListData.payload);
            }),
            catchError((errorRes) => {
              return of(
                new ShoppingListActions.edit_item_fail(errorRes.message)
              );
            })
          );
      })
    )
  );

  /**
   * Sends an http get request to get the list of items from the server
   */
  getItems = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.GET_ITEMS_START),
      switchMap((shoppingListData: ShoppingListActions.get_items_start) => {
        return this.http
          .get<ShoppingListData>('http://localhost:3000/items/')
          .pipe(
            map((resData) => {
              return new ShoppingListActions.GetItems([
                ...Object.values(resData),
              ]);
            }),
            catchError((errorRes) => {
              return of(
                new ShoppingListActions.get_items_fail(errorRes.message)
              );
            })
          );
      })
    )
  );

  // @Effect()
  // clearItems = this.actions$.pipe(
  //   ofType(ShoppingListActions.CLEAR_ALL_START),
  //   switchMap((shoppingListData: ShoppingListActions.clear_all_start) => {
  //     shoppingListData.payload.forEach((id) => {
  //       console.log(id);
  //       this.http.delete<ShoppingListData>(`http://localhost:3000/items/${id}`);
  //     });

  //     return this.http
  //       .get<ShoppingListData>(`http://localhost:3000/items/`)
  //       .pipe(
  //         map((resData) => {
  //           return new ShoppingListActions.ClearAll();
  //         })
  //         // catchError((errorRes) => {
  //         //   let errorMessage = 'An unknown error occurred!';
  //         //   return of(new ShoppingListActions.edit_item_fail(errorMessage));
  //         // })
  //       );
  //   })
  // );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
