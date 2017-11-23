import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MainPage } from '../pages/Main/Main';
import { GlobalVars } from '../providers/globals';
import { Events } from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MainPage;

    budget: number;
    constructor(public platform: Platform, private globalvar: GlobalVars, public events: Events) {
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
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    onchangebudget() {       
        this.globalvar.setbudget(this.budget);
        console.log(this.budget +"= budgetaktl");
    }
    menuClosed() {
        this.events.publish('menu:closed', '');
        //code to execute when menu has closed
        console.log("menu closed");
    }
}
