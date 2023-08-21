import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' 
})
export class PostsService {
  loadedPosts : Post[]=[]
  constructor(private http :HttpClient) { }

  createAndStorePost(title:string,content:string){

    const postData :Post={ title:title,content:content}
    this.http
    .post(
    'https://http-ng-f25e2-default-rtdb.firebaseio.com/posts.json',
     postData
     )
     .subscribe(
      responseData => {
        console.log(responseData)
      }
     );
    console.log(postData);
  }
 fetchPosts(){
  return this.http
   .get<{[key:string]:Post}>('https://http-ng-f25e2-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(
        responseData => {
          const postsArray : Post[]=[];
          for(const key in responseData){
            if (responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key], id:key});
            }
          }
          return postsArray;
        }
      )
    );
 }

 deletePosts(){
 return this.http
 .delete('https://http-ng-f25e2-default-rtdb.firebaseio.com/posts.json');
 }
}
