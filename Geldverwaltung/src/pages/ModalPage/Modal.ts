import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { MainPage } from '../Main/Main';
import { Einkaufsliste } from "../Main/Einkaufsliste";

@Component({
    selector: 'page-Modal',
    templateUrl: 'Modal.html'
})
export class ModalPage implements OnInit {

    ueberschrift: string;
    betrag: number;
    kommentar: string;
    einkaufslisteID: any;
    einkauf: Einkaufsliste;
    showFooter: boolean = false;
    constructor(public navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private globalvar: GlobalVars) {

    }
    ngOnInit() {
        
        this.einkaufslisteID = this.navParams.get('Id');
        this.einkauf = this.globalvar.einkaufsliste[this.einkaufslisteID];
        this.ueberschrift = this.einkauf.ueberschrift;
        this.betrag = this.einkauf.betrag;
        this.kommentar = this.einkauf.kommentar;
    }

    onLink(url: string) {
        window.open(url);
    }
    zurueck() {
        this.viewCtrl.dismiss();
    }
    speichern() {
        
        if (typeof this.ueberschrift === 'undefined') { }
        else if (typeof this.betrag === 'undefined') { }
        else {
            this.globalvar.einkaufsliste[this.einkaufslisteID] = {
                ueberschrift: this.ueberschrift,
                betrag: this.betrag,
                kommentar: this.kommentar
            }
        }

        this.viewCtrl.dismiss().catch(() => console.log('view was dismissed'));

    }
}

