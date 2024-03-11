import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FireService, urunBilgi } from '../fire.service';
import { Auth } from '@angular/fire/auth';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id?:string;
  urun!:urunBilgi;

  constructor(private auth:Auth, private fireService:FireService, private modalController:ModalController) { }

  ngOnInit() {
    this.fireService.urunGetir(this.id, this.auth.currentUser?.uid).subscribe((sonuc:any)=>{this.urun = sonuc;}, (hata:any)=>{});
  }

  kapat()
  {
    this.modalController.dismiss({'dismissed':true});
  }

  async urunGuncelle()
  {
   await this.fireService.urunGuncelle(this.urun, this.auth.currentUser?.uid)
   this.modalController.dismiss();
  }

  async sil()
  {
  await this.fireService.urunSil(this.urun.id, this.auth.currentUser?.uid);
  this.modalController.dismiss();
  }
}
