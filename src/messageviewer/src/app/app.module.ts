import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root/root.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { StarCountComponent } from './starcount/starcount.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RootComponent,
    MessageComponent,
    MessagesComponent,
    StarCountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
