import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent  implements OnInit {

  @Input() post!: Post
  @Input() isNew!: boolean

  selectedImage: string = ''
  constructor(
    public platform: Platform,
    private utilsSvc: UtilsService,
    private posrSvc: PostService
  ) { }

  ngOnInit() {
    this.selectedImage = this.post.images[0]
  }

  submit(){

    let userPosts :Post[] = this.utilsSvc.getElementInLocalStorage('userPosts') || []
    this.utilsSvc.presentLoading({message: 'Publicando...'})
    this.posrSvc.createPost(this.post).subscribe({
      next:(res:any)=>{

        userPosts.push(res.post)
        this.utilsSvc.setElementInLocalStorage('userPosts', userPosts)

        this.utilsSvc.routerLink('/home')
        this.utilsSvc.dismissModal()
        this.utilsSvc.dismissLoading()

      },error: (error:any)=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'error',
          color: 'danger',
          duration: 1500,
          icon: 'alert-circle-outline'
        })

        this.utilsSvc.dismissLoading()
        
      }
    })
  }

  saveImage(){
    if(this.platform.is('capacitor')){
      this.utilsSvc.shareImageInMobile(this.selectedImage)
    }else{
      this.utilsSvc.saveImageInweb(this.selectedImage)
    }
  }

  copyPromptToCliboard(){
    this.utilsSvc.copyToClip(this.post.prompt)
    this.utilsSvc.presentToast({
      message: 'Copiado con exito al portapapeles',
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary'
    })
  }

}
