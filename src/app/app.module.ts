import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { OutputComponent } from './components/output/output.component';

import { FormsModule } from '@angular/forms';
import { shoppingListReducer } from './store/shopping-list.reducer';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { ShoppingListEffect } from './store/shopping-list.effects';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, InputComponent, OutputComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    EffectsModule.forRoot([ShoppingListEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
