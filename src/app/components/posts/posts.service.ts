import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient,
    private router: Router) { }

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post) => {
        return  {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  createPost(title: string, content: string) {
    const post = {
      id: null,
      title: title,
      content: content
    }
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      const id = responseData.id;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  getUpdatedPostListener() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string) {
   // return {...this.posts.find(p => p.id === id)}
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  deletePost(id: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id ).subscribe((response) => {
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content
    }
    this.http.put<{message: string}>('http://localhost:3000/api/posts/' + id, post).subscribe((responseData) => {
      const updatedPosts = [...this.posts];
      const postIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[postIndex] = post;
      this.posts = [...updatedPosts];
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
