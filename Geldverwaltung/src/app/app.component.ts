import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MainPage } from '../pages/Main/Main';
import { GlobalVars } from '../providers/globals';
import { DetailsPage } from '../pages/DetailsPage/Details';
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'app.html'  
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MainPage;

    constructor(public platform: Platform, private globalvar: GlobalVars) {
        this.initializeApp();        
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            
        });
        
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

}
