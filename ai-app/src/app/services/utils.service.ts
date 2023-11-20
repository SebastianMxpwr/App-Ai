import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import {  Clipboard  } from "@capacitor/clipboard";
import { saveAs } from 'file-saver';
import { Share } from "@capacitor/share"
import { Filesystem, Directory} from "@capacitor/filesystem";
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modelController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router : Router
  ) { }


    routerLink(url: string){
      return this.router.navigateByUrl(url)
    }

  setElementInLocalStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element))
  }

  getElementInLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) as string)
  }


   async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
   }

   async dismissLoading(){
    return await this.loadingController.dismiss()
   }

    async shareImageInMobile(url: string){
      let base64: string
      let path = `${Date.now()}.jpg`

      if(url.includes('https')){
        base64 = await this.convertURlToBase64(url) as string
      }else{
        base64 = url
      }

      await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache
      }).then(async(res)=>{
        await Share.share({url: res.uri}).then(()=>{
          this.presentToast({
            message: 'Imagen Compartida Exitosamente',
            color: 'primary',
            icon: 'share-social-outline',
            duration: 1000
          })
        })

        await Filesystem.deleteFile({
          path,
          directory: Directory.Cache
        })
      })
    }


    async convertURlToBase64(url: string){
      let response = await fetch(url)
      let blob = await response.blob()

      return new Promise((res, rej)=>{
        let reader = new FileReader()
        reader.onerror = rej
        reader.onload = ()=>{
          res(reader.result)
        }

        reader.readAsDataURL(blob)
      })
    }



  async presentModal(opts: ModalOptions){
    const modal = await this.modelController.create(opts)
    await modal.present()
  }

  saveImageInweb(url: string){
    return saveAs(url, `${Date.now()}.jpg`)
  }

  dismissModal(){
    return this.modelController.dismiss()
  }

  async copyToClip(string: string){
    return await Clipboard.write({string})
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
}
