import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { MainPage } from '../Main/Main';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-Details',
  templateUrl: 'Details.html'

})
export class DetailsPage implements OnInit {


  ueberschrift: string;
  betrag: number;
  kommentar: string;
  showFooter: boolean = false;
  constructor(public storage: Storage, private toastCtrl: ToastController, public navCtrl: NavController, private globalvar: GlobalVars) {

  }
  ngOnInit() {
  }

  onLink(url: string) {
    window.open(url);
  }
  zurueck() {
    this.navCtrl.push(MainPage);
  }
  clicked: boolean = false;
  plusminus: boolean;
  speichern() {
    //console.log(this.ueberschrift);
    if (this.clicked==true){
      if (typeof this.ueberschrift === 'undefined' || typeof this.betrag === 'undefined') {
        let toast = this.toastCtrl.create({
          message: 'Es wurde ein Feld nicht ausgefüllt',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      else if (typeof this.betrag === 'undefined') { }
      else {
        if (this.plusminus == true) {
          //console.log(this.betrag);
          //console.log(this.kommentar);
          this.globalvar.einkaufsliste.push({
            ueberschrift: this.ueberschrift,
            betrag: this.betrag,
            kommentar: this.kommentar,
            plusminus: true
          });
          this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
          this.navCtrl.push(MainPage);
        }
        else {
          this.globalvar.einkaufsliste.push({
            ueberschrift: this.ueberschrift,
            betrag: this.betrag,
            kommentar: this.kommentar,
            plusminus: false
          });
          this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
          this.navCtrl.push(MainPage);
        }
        console.log(this.plusminus);
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Sie müssen einen Button auswählen!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    
  }
  buttonColor1: string = '#55acee';
  buttonColor2: string = '#55acee';
  plus() {
    this.plusminus = true;
    this.buttonColor1 = '#76ee00'
    this.buttonColor2 = '#55acee';
    this.clicked = true;
  }
  minus() {
    this.plusminus = false;
    this.buttonColor1 = '#55acee';
    this.buttonColor2 = '#EE0000';
    this.clicked = true;

  }
}

