import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{

  catPostArray: any [] = [];
  catTitle: any;
  selectedCat: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
    ) {}

  ngOnInit(): void {
      this.route.params.subscribe(val => {
        this.catTitle = val;
        this.postService.loadCategoryPost(val['id']).subscribe(post => {
          this.catPostArray = post;
        })
      })
  }


}
