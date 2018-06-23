import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../../appservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'
import {Cookie}  from 'ng2-cookies/ng2-cookies'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public email: String;
  public password: String;


  constructor(public apps: AppserviceService, public toastr: ToastrService, public router: Router) { }

  ngOnInit() {
  }

    public goToSignUp(){
      this.router.navigate(['/signup'])
         
    }

  public login() {
    if (!this.email) {
      this.toastr.warning('enter email')
    }
    else if (!this.password) {
      this.toastr.warning('enter password')
    }

    else {
      let data = {
        password: this.password,
        email: this.email
      }

      this.apps.signInFunction(data).subscribe((apiResponse) => {

          if (apiResponse.status === 200) {

            Cookie.set('authToken', apiResponse.data.authToken)
            Cookie.set('receiverId', apiResponse.data.userDetails.userId)
            Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName )
             this.apps.setUserInfoFromLocalStorage(apiResponse.data.userDetails)

            this.toastr.success('login succesfull')
            setTimeout(() => {
              this.router.navigate(['/chat'])
            }, 1000);
          }
          else {
            this.toastr.warning(apiResponse.message)
          }
        },
          (error) => {
            console.log(error.errorMessage)
            this.toastr.error('some error occured')
          });

    }
  }



}
