import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Like from '../models/Like';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl: string = `${environment.baseUrl}/post`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  getAllTopPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/feed`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  upsertPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}`, post, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  postById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${postId}`,{
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  likeExists(post: Post, user: User): Observable<boolean>{
    return this.http.get<boolean>(`${this.postUrl}/like/${post.id}/${user.id}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  postLike(like: Like): Observable<Like>{
    return this.http.post<Like>(`${this.postUrl}/like`, like, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  deleteLike(like: Like): Observable<boolean>{
    return this.http.delete<boolean>(`${this.postUrl}/like`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
      body: like
    });
  }
}
