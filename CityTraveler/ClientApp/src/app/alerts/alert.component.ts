import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  ngOnInit(){
    this.open();
  }

  isHidden=false;
  message="Trip was created!";

  public close(){
    this.isHidden=true;
  }

  public open(){
    this.isHidden=false;
  }
}
