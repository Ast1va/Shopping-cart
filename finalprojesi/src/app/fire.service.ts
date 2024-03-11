import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { User } from './user.class';
import { AlertController } from '@ionic/angular';



export interface urunBilgi
{
id?:string;
ad?:string;
adet?:string;
tarih?:number;
}

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private alertController:AlertController, private auth:Auth, private firestore:Firestore) { }

kayitListele(userId:any):any
{
  //const urunSonuc = collection(this.firestore, 'urunler');
  const urunSonuc = collection(this.firestore, `kullanicilar/${userId}/urunler`);
  return collectionData(urunSonuc, {idField: 'id'} );
}

yeniKayit(urun:urunBilgi, userId:any)
{
  //const urunSonuc = collection(this.firestore, 'urunler');
  const urunSonuc = collection(this.firestore, `kullanicilar/${userId}/urunler`);
  return addDoc(urunSonuc, urun);
}
urunGetir(id:any, userId:any)
{
  //const urunSonuc = doc(this.firestore, `urunler/${id}`);
  const urunSonuc = doc(this.firestore,`kullanicilar/${userId}/urunler/${id}`);
  return docData(urunSonuc, {idField: 'id'});
}

urunGuncelle(urun: urunBilgi, userId:any ) 
{
  //const urunSonuc = doc(this.firestore, `urunler/${urun.id}`);
  const urunSonuc = doc(this.firestore,`kullanicilar/${userId}/urunler/${urun.id}`);
  return updateDoc(urunSonuc, { ad: urun.ad, adet: urun.adet });
}


urunSil(id:any, userId:any)
{
  //const urunSonuc = doc(this.firestore, `urunler/${id}`);
  const urunSonuc = doc(this.firestore, `kullanicilar/${userId}/urunler/${id}`);
  return deleteDoc(urunSonuc);
}
async epostaParolaKayitOl(user:User)
{
  try {
  const kayitYapanKullanici = await createUserWithEmailAndPassword(this.auth, user.email, user.password)
  return kayitYapanKullanici;
  }
  catch (error)
  {
    return 'HATA: ' + error;
  }
  
}
async epostaParolaGirisYap(user:User)
{
  try{
  const girisYapanKullanici = await signInWithEmailAndPassword(this.auth, user.email, user.password)
   return girisYapanKullanici
}

  catch (error)
  {
    return 'HATA: ' + error;
  }
}

async cikisYap()
{
  try{
    await signOut(this.auth);
    return true;
  }
  catch (error)
  {
    return 'HATA: ' + error;
  }
}

async presentAlert(durum:any, mesaj:any)
{
  const alert = await this.alertController.create({
  header: durum,
  message:mesaj,
  buttons: ['Tamam'],
 });
  await alert.present();
}


}
