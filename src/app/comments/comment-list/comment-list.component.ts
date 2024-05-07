import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{

  comData: any;
  @Input() postId!: string;
  filteredComments: any[] = [];

  constructor(
    private comService: CommentsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

  this.route.params.subscribe(val => {
    this.comService.loadComments(val['id']).subscribe(comments => {
      this.filteredComments = comments;
      this.comData = this.filteredComments;
    });
  });

}
}
