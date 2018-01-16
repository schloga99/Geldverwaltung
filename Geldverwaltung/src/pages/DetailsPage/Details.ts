import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { MainPage } from '../Main/Main';
import { ToastController } from 'ionic-angular';


@Component({
    selector: 'page-Details',
    templateUrl: 'Details.html'
    
})
export class DetailsPage implements OnInit {

    ueberschrift: string;
    betrag: number;
    kommentar: string;
    showFooter: boolean = false;
    constructor(private toastCtrl: ToastController,public navCtrl: NavController, private globalvar: GlobalVars) {
        
    }
    ngOnInit() {
    }

    onLink(url: string) {
        window.open(url);
    }
    zurueck() {
        this.navCtrl.push(MainPage);
    }
    speichern() {
        //console.log(this.ueberschrift);
        if (typeof this.ueberschrift === 'undefined' || typeof this.betrag === 'undefined') {
            let toast = this.toastCtrl.create({
                message: 'Es wurde ein Feld nicht ausgefüllt',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (typeof this.betrag === 'undefined') {
           
        }
        else {
            //console.log(this.betrag);
            //console.log(this.kommentar);
            this.globalvar.einkaufsliste.push({
                ueberschrift: this.ueberschrift,
                betrag: this.betrag,
                kommentar: this.kommentar
            });
        }
       
        this.navCtrl.push(MainPage);
        
    }
}

