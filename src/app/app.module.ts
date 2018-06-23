import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ RouterModule, Routes }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }  from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user/login/login.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ChatModule,
    UserModule,
    SharedModule,
    ToastrModule .forRoot(),
    RouterModule.forRoot([
      {path:'login' , component:LoginComponent, pathMatch:'full'},
      {path:'' , redirectTo:'login' , pathMatch:'full'},
      {path:'*', component:LoginComponent},
      {path:'**' , component:LoginComponent}

    ])


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
