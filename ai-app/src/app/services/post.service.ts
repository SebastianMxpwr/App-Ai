import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(){
    return this.http.get(environment.baseUrl + environment.gpost)
  }

  createPost(post: Post){
    return this.http.post(environment.baseUrl + environment.cpost, post)
  }
}
