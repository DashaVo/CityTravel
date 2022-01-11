import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'infopoint',
  templateUrl: './infopoint.component.html',
  styleUrls: ['./infopoint.component.scss']
})
export class InfopointComponent implements OnInit {
  @Input() title:string
  @Input() value: string
  constructor() { }

  ngOnInit() {
  }

}
