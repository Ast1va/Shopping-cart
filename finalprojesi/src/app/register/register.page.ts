import { Component, OnInit } from '@angular/core';
import { User } from '../user.class';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData: User = new User();

  constructor(private router:Router, private fireService:FireService) { }

  ngOnInit() {
  }

  async kayit()
  {
    const sonuc = await this.fireService.epostaParolaKayitOl(this.userData);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user)
    this.router.navigateByUrl('/home');
    else
    this.fireService.presentAlert('Hata', 'Hatalı kullanıcı adı veya şifre, lütfen tekrar giriniz');


  }
}
