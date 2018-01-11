import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { MainPage } from '../Main/Main';

@Component({
    selector: 'page-Details',
    templateUrl: 'Details.html'
})
export class DetailsPage {
   
    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {
        
    }

    onLink(url: string) {
        window.open(url);
    }
    zurueck() {
        this.navCtrl.push(MainPage);
    }
    speichern() {
        
        this.navCtrl.push(MainPage);
        
    }
}

