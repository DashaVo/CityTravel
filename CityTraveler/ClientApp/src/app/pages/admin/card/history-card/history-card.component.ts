import { Component, Input, OnInit } from '@angular/core';
import { ICommentPreview } from 'src/app/models/comment.model';

@Component({
  selector: 'history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class CardHistoryComponent implements OnInit {

  @Input() comment : string;
  @Input() review : string;
  constructor() { }

  ngOnInit() {
  }

}
