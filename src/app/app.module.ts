import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AutocompleteComponent } from './auto-completion/auto-completion.component';
import { GroupedByPipe } from './auto-completion/grouped-by.pipe';

@NgModule({
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    AutocompleteComponent,
    GroupedByPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
