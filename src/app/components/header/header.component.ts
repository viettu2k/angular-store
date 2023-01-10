import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <p class="font-bold">header works!</p> `,
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
