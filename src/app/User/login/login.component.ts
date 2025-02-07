import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthToken } from '../../Services/auth.service';
import { catchError, finalize } from 'rxjs';
/* import { SharedService } from '../../Services/shared.service'; */
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    /* private sharedService: SharedService, */
    private router: Router,
    private snackBar: MatSnackBar,
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
    sessionStorage.removeItem('ibrelleu_user');

    if ( this.loginForm ) {
        this.authService.login( this.loginForm.value )
        .subscribe (
          (item:AuthToken ) => {
            console.log ("Welcome to IBRelleu Market Place created by the ADR Balears ...")
            responseOK = true
            errorResponse = "Logged in"
            sessionStorage.setItem('ibrelleu_user', this.jwtHelper.decodeToken(item.access_token).name)
            sessionStorage.setItem('access_token', item.access_token)
            sessionStorage.setItem("preferredLang", "cat")

            this.showSnackBar(errorResponse + " as " + this.jwtHelper.decodeToken(item.access_token).name)
            if (this.jwtHelper.decodeToken().role === 'admin') {
              this.isAODL = false
            }
            this.router.navigate(['/body'])
            },
            (error: any) => {
                  responseOK = false
                  this.showSnackBar(error)
                  this.loginForm.reset()
                },
                  () => {
                    console.log("Login complete, redirecting ...")
                    this.router.navigateByUrl('home')
                  }
        )
    }
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'X', { duration: 10000, verticalPosition: 'top', 
      horizontalPosition: 'center', panelClass: ["custom-snackbar"]} );
  }

}
