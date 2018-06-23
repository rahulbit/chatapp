import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBoxComponent } from './chat-box/chat-box.component';
import{ RouterModule, Routes }  from '@angular/router';
import { ChatRouteGuardService } from  "./chat-route-guard.service"


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'chat', component:ChatBoxComponent, canActivate:[ChatRouteGuardService]}
    ])
  ],
  declarations: [ChatBoxComponent],
  providers:[ChatRouteGuardService]
})
export class ChatModule { }
