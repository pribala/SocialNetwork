import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  userInput = '';
  title = '';
  posts = [];
  isLoading = false;
  private postId: string;
  private mode = 'create';
  post: Post;
  constructor(public postService: PostsService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(res => {
          this.isLoading = false;
          this.post = {id: res._id, title: res.title, content: res.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }
  onSavePost(form: NgForm) {
    this.isLoading = true;
    if (this.mode === 'edit') {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.postService.createPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
