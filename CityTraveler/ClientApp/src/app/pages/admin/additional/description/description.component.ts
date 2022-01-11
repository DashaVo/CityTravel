import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
   @Input() decs: string
  constructor() { }

  ngOnInit() {
  }

}
