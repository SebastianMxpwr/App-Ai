import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Post } from 'src/app/models/post.models';
import { ImageaiService } from 'src/app/services/imageai.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';
import { surpriseMePrompts } from 'src/assets/data/surprise-promts';

@Component({
  selector: 'app-create-images',
  templateUrl: './create-images.page.html',
  styleUrls: ['./create-images.page.scss'],
})
export class CreateImagesPage implements OnInit {

  form = new FormGroup({
    prompt: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  })

  userPost: Post[] = []
  constructor(
    private utilS: UtilsService,
    public router: Router,
    private imageSrv: ImageaiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserPost()
  }

  getUserPost(){
    return this.userPost = this.utilS.getElementInLocalStorage('userPosts' || [])
    
  }

  submit(){
    console.log(this.form.value);

    let prompt = this.form.value.prompt as string
    this.utilS.presentLoading({message: 'Generando'})
    this.imageSrv.sendPromp(prompt).subscribe({
      next: (res: any)=>{
        console.log(res);

        let post : Post = {
          prompt,
          images: res.images,
          name: this.form.value.name as string
        }

        this.showPostdetail(post, true)
        this.utilS.dismissLoading()
      },error: (error:any)=>{
        console.log(error);
        this.utilS.dismissLoading()
      }
    })
    
  }

  randomPromt(){
    let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    let randomElement = surpriseMePrompts[randomIndex]
    this.form.controls.prompt.setValue(randomElement)
  }

  async showPostdetail(post: Post, isNew?: boolean){
    await this.utilS.presentModal({
      component: PostDetailComponent,
      componentProps: {post, isNew},
      cssClass: 'modal-full-size'
    })
  }

}
