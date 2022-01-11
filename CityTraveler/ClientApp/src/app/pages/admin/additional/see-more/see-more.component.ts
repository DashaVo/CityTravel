import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent implements OnInit {
  @Input( ) title: string;
  constructor() { }

  ngOnInit() {
  }

}
