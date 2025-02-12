import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CdkMenuTrigger } from '@angular/cdk/menu';


@Component({
  selector: 'adr-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  theToken: string = sessionStorage.getItem('access_token')
  showUserData: boolean = false

  @Input() actualUser: string = "not user"
  @Input() actualRole: string = "no role"

  @ViewChild(CdkMenuTrigger) menuTrigger: CdkMenuTrigger;

  constructor(private breakpointObserver: BreakpointObserver, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    console.log ("Welcome to ibrelleu from ADR Balears!!!")
    if (this.theToken) {
      this.showUserData = true
      this.actualUser = this.jwtHelper.decodeToken(this.theToken).name
      this.actualRole = this.jwtHelper.decodeToken(this.theToken).role
    } else {
      this.actualUser = " no user "
      this.actualRole = " no role "
    }
  }

  onMenuItemClick() {
    this.menuTrigger.close();
  }

}
