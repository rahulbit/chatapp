import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../../appservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: String;
  public lastName: String;
  public email: String;
  public password: String;
  public apikey: String;
  public mobileNumber: any;

  constructor(public apps: AppserviceService, public toastr: ToastrService, public router: Router) { }

  ngOnInit() {
  }

  public goToSignIn(){
    this.router.navigate(['/login'])
  }

  public goToSignUp() {

    if (!this.firstName) {
      this.toastr.warning('enter first name')
    }
    else if (!this.lastName) {
      this.toastr.warning('enter last name')
    }
    else if (!this.email) {
      this.toastr.warning('enter  email')
    }
    else if (!this.password) {
      this.toastr.warning('enter password')

    }
    else if (!this.mobileNumber) {
      this.toastr.warning('enter mblieNumber')
    }
    else if (!this.apikey) {
      this.toastr.warning('enter apikey')
    }

    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        moblieNumber: this.mobileNumber,
        apikey: this.apikey,
        password: this.password,
        email: this.email

      }

      console.log(data)

      this.apps.signUpFunction(data).
        subscribe((apiResposnse) => {

        
            this.toastr.success('signup  succesfull ')

            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 2000);


          
          
        },
          (err) => {
            this.toastr.warning('some error occured')
          });
    }
  }

}
