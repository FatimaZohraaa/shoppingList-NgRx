import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { OutputComponent } from './components/output/output.component';

import { FormsModule } from '@angular/forms';
import { shoppingListReducer } from './store/shopping-list.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, InputComponent, OutputComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
