import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'adr-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    
  }

  sidenav() {
    
  }
}
