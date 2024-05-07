import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  commentArray: any[] = [];
  @ViewChild('commentForm') commentForm!: NgForm;
  postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private comService: CommentsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.comService.loadComments(this.postId).subscribe(comment => {
        this.postId = val['id'];
        this.commentArray = comment;
      });
    });
  }

  onSubmitComment(formValue: any) {
    const comData: Comment = {
      name: formValue.name,
      comment: formValue.comment,
      createdAt: new Date(),
      postId: this.postId,
    };

    this.comService.addComments(comData);
    this.commentForm.resetForm();
    
  }
}