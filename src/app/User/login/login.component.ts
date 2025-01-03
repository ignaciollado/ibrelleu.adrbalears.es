import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthToken } from '../../Services/auth.service';
import { catchError, finalize } from 'rxjs';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'adr-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup
  isAODL: boolean = false

  constructor( private fb: FormBuilder, 
    private authService: AuthService, 
    private sharedService: SharedService,
    private router: Router,
    private jwtHelper: JwtHelperService ) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    let responseOK: boolean = false
    let errorResponse: any
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('ibrelleu_id');

    if ( this.loginForm ) {
        this.authService.login( this.loginForm.value )
        .subscribe (
          (item:AuthToken ) => {
            console.log ("Welcome to IBRelleu Market Place created by the ADR Balears ...")
            responseOK = true
            errorResponse = "login correct"
            sessionStorage.setItem('ibrelleu_id', item.user_id)
            sessionStorage.setItem('access_token', item.access_token)
            this.sharedService.managementToast( 'loginFeedback', responseOK, errorResponse )
            localStorage.setItem("preferredLang", "cat")
            if (this.jwtHelper.decodeToken().role === 'admin') {
              this.isAODL = false
            }
            },
            (error: any) => {
                  responseOK = false
                  this.sharedService.errorLog(error)
                  this.sharedService.managementToast( 'loginFeedback', responseOK, error )
                  this.loginForm.reset()
                },
                  () => {
                    console.log("Login complete, redirecting ...")
                    this.router.navigateByUrl('home')
                  }
        )
    }
  }

}
