import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform:Platform, private router:Router) {
    this.initializeApp();
  }

  ngOnInit() {
    
  }

  initializeApp() {
    this.platform.ready().then(()=>{
    //const auth = getAuth();
    //const user = auth.currentUser;
    //if (user)
    //this.router.navigateByUrl('/home');

    });
    
    }
}
