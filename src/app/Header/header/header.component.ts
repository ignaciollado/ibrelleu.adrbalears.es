import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'adr-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  theToken: string = sessionStorage.getItem('access_token')
  actualUser: string
  actualRole: string
  siMostrar: boolean = true

  constructor(private breakpointObserver: BreakpointObserver, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    /* console.log (this.jwtHelper.decodeToken(this.theToken)) */
    console.log ("Welcome to ibrelleu from ADR Balears!!!")
    
    if (this.theToken) {
      this.actualUser = this.jwtHelper.decodeToken(this.theToken).name
      this.actualRole = this.jwtHelper.decodeToken(this.theToken).role
    } else {
      this.actualUser = " no user logged "
      this.actualRole = " no role set "
    }
  }

  sidenav() {
    
  }

}
