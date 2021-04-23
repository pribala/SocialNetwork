import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  constructor(public postService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postService.getUpdatedPostListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.postService.deletePost(id);
  }

}
