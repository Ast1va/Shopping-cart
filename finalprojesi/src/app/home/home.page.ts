import { Component } from '@angular/core';
import { FireService, urunBilgi } from '../fire.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  urunler:urunBilgi[]=[];

  constructor(private auth:Auth, private router:Router, private modalController:ModalController, private alertController:AlertController, private fireService:FireService) {

    this.fireService.kayitListele(this.auth.currentUser?.uid).subscribe((sonuc:any)=>{this.urunler = sonuc;}, (hata:any)=>{})
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ürün Ekle',
      inputs:[
        {
          name: 'urun_ad',
          placeholder:'ürün giriniz',
          type:'text'
        },
        {
          name: 'urun_adet',
          placeholder:'adet giriniz',
          type:'number',
          min:1,
          max:100,
        },
      ],
      buttons: [
      {
        text:'Vazgeç',
        role:'Cancel'
      },
      {
        text:'Ekle',
        handler: res=> {
          let urun  = {
            ad:res.urun_ad,
            adet:res.urun_adet,
            tarih:(Math.floor(Date.now()/1000)),
          };
          this.fireService.yeniKayit(urun, this.auth.currentUser?.uid);
          console.log('Kayit Eklendi!');
        }
      }
    
    ],
    });

    await alert.present();

  }
 async detayGoster(urun:urunBilgi)
 {
  const modal = await this.modalController.create({
    component:ModalPage,
    componentProps:{id: urun.id},


  });
  await modal.present();
 }

 async cikis()
  {
 const sonuc = await this.fireService.cikisYap();
 this.router.navigateByUrl('/login');
  }
 



}




