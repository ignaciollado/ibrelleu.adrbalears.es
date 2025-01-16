import { Component } from '@angular/core';

@Component({
  selector: 'adr-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentLang: string | undefined
  id: number[] = [300, 200, 100, 50]

  constructor() {}
 
  ngOnInit(): void { }
}
