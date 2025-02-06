import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'adr-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  sessionValid: boolean = false
  theToken: string = sessionStorage.getItem('access_token')
  constructor( private authService: AuthService, 
      private router: Router,
      private snackBar: MatSnackBar,
      private jwtHelper: JwtHelperService) {}

  ngOnInit() {
    if (this.jwtHelper.tokenGetter()) {
      if (!this.jwtHelper.isTokenExpired(this.theToken)) {
        this.sessionValid = true
      }
    } else {
      this.sessionValid = false
    }
  }

  loginUSER() {
    this.router.navigate(['login'])
  }

  logOutUSER() {
    this.authService.logout()
    this.showSnackBar("Logged out ... ")
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'X', { duration: 10000, verticalPosition: 'top', 
      horizontalPosition: 'center', panelClass: ["custom-snackbar"]} );
  }
}
