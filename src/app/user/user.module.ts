import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule , ReactiveFormsModule }  from '@angular/forms';
import{ RouterModule, Routes }  from '@angular/router';




@NgModule({
  imports: [
    CommonModule,
     FormsModule,
     ToastrModule.forRoot(),
     RouterModule.forChild([
        {path:'signup' , component:SignupComponent}
        
     ])
     
  ],
  declarations: [SignupComponent, LoginComponent]
})
export class UserModule { }
