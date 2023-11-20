import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  post: Post[] = []
  loading: boolean = false
  constructor(
    private utilS: UtilsService,
    public router: Router,
    private utilsSvc: UtilsService,
    private postSvc: PostService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPost()
  }

  getPost(){
      this.loading = true
      this.postSvc.getPost().subscribe({
        next:(res: any)=>{
          console.log(res)
          this.post = res.posts
          this.loading = false
        },error: (error: any)=>{
          console.log(error);
          this.loading = false
          
        }
      })
  }

  doRefresh(event:any){
    setTimeout(()=>{
      this.getPost()

      event.target.complete()
    }, 200)
  }

  async showPostdetail(post: Post){
    await this.utilS.presentModal({
      component: PostDetailComponent,
      componentProps: {post},
      cssClass: 'modal-full-size'
    })
  }

  goTo(){
    this.router.navigate(['/crate-images'])
  }

}
