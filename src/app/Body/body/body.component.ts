import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'adr-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  constructor(private route: ActivatedRoute,  private router: Router) {}

  loginUSER() {
    this.router.navigate(['login'])
  }

}
