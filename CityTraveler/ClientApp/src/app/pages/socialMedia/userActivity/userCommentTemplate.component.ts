import { Component, Input, Output } from "@angular/core";
import { ICommentModel } from "src/app/models/comment.model";

@Component({
  selector: 'user-comment',
  templateUrl: './userCommentTemplate.component.html',
  styleUrls: ['./userCommentTemplate.component.scss']
})

export class UserCommentTemplate {
  @Input() public comment : ICommentModel;
  @Output() public commentOut : ICommentModel;

  deleteComment(commentId : string) {
  }
  openEditingWindow(comment: ICommentModel) {
    comment.isEditing = (!comment.isEditing);
  }
  editComment(comment: ICommentModel) {
  }
}
