import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../Services/auth.service';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'adr-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  sessionValid: boolean = false
  theToken: string = sessionStorage.getItem('access_token')
  constructor( private authService: AuthService, 
      private sharedService: SharedService,
      private router: Router,
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
  }

}
