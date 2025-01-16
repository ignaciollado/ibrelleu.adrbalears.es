import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'adr-show-generic-data',
  templateUrl: './show-generic-data.component.html',
  styleUrl: './show-generic-data.component.scss'
})
export class ShowGenericDataComponent {
 id:number = +this.route.snapshot.paramMap.get('id')


 constructor( private route: ActivatedRoute) {}
}
