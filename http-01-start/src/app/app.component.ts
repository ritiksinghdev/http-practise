import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFectching:boolean=false;
  constructor(private http: HttpClient,private postService:PostsService) {

  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
   this.postService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFectching=true;
    this.postService.fetchPosts().subscribe(
      posts => {
      
      this.loadedPosts=posts;
            console.log(posts);
            this.isFectching=false;

    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      ()=>{
        this.loadedPosts=[]
      }
    )

  }

  private fetchPosts(){
    this.isFectching=true;
    this.http.get<{[key:string]:Post}>('https://http-ng-f25e2-default-rtdb.firebaseio.com/posts.json')
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
    )
    .subscribe(
      posts => {
      
      this.loadedPosts=posts;
            console.log(posts);
            this.isFectching=false;

    });
  }
} 
