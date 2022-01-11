import { ICommentModel } from 'src/app/models/comment.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cardcomment',
  templateUrl: './cardcomment.component.html',
  styleUrls: ['./cardcomment.component.scss']
})
export class CardcommentComponent implements OnInit {
  @Input() comment: ICommentModel

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
