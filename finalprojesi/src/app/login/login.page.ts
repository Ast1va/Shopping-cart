import { Component, OnInit } from '@angular/core';
import { User } from '../user.class';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData: User = new User();

  constructor(private router:Router, private fireService:FireService) { }

  ngOnInit() {
  }

  async girisYap()
  {
    await this.fireService.epostaParolaGirisYap(this.userData);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user)
    this.router.navigateByUrl('/home');
    else
    this.fireService.presentAlert('Hata', 'Hatalı kullanıcı adı veya şifre, lütfen tekrar giriniz');


  }

}
