import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { DetailsPage } from '../DetailsPage/Details';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { ModalPage } from '../ModalPage/Modal';
import { Storage } from '@ionic/storage';
import { StatistikPage, helplist } from '../Statistik/Statistik';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {
  budget: number = 0;
  shownbudget: number = 0;
  singleValue: number; //Anzeige der Einnahmen minus Ausgaben
  durchschnittsbudgetmonat: any = 0;
  einkaufsliste: Array<any> = [];
  showFooter: boolean = false;
  alleBeträge: number = 0;
  storagelength: any;

  //DateVariablen
  aktlmonth: any;
  myDaysInmonth: number;
  month: any;
  year: any;
  monthFull: any;

  constructor(public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController, private globalvar: GlobalVars, public alertCtrl: AlertController) { }

  ngOnInit() {
    Promise.all([
      this.storage.get('budget'),
      this.storage.get('einkaufsliste'),
      this.storage.get('monatsübersicht'),
      this.storage.length().then(result => {
        this.storagelength = result;
      })
    ]).then(([budget, einkaufsliste, monatsübersicht]) => {
      console.log(this.storagelength + " storage length");

      if (this.storagelength != 0) {
        if (this.budget == undefined) {
          this.globalvar.setbudget(budget);
          //console.log(this.globalvar.budget + " globalvar budget ");
        }
        if (this.budget == null) {
          this.globalvar.setbudget(budget);
          //console.log(this.globalvar.budget + " globalvar budget ");
        }
        console.log(this.globalvar.einkaufsliste.length + " Einkaufsliste length ");
        if (this.globalvar.einkaufsliste.length == 0) {
          this.globalvar.seteinkaufsliste(einkaufsliste);
        }
        console.log(monatsübersicht);
        if (this.globalvar.monatsübersicht.length == 0) {
          this.globalvar.setmonatsübersicht(monatsübersicht);
        }
      }
      var today = new Date();
      var date = new Date(today),
        locale = "de";
      this.aktlmonth = date.toLocaleString(locale, { month: "long" });
      this.month = today.getMonth();
      this.year = today.getFullYear();
      console.log(this.month + " " + this.year);
      this.myDaysInmonth = this.daysInMonth(this.month + 1, today.getFullYear());
      //console.log(this.globalvar.einkaufsliste.length);
      this.budget = this.globalvar.budget;
      this.setAlleBeträge();
      this.shownbudget = this.globalvar.budget;
      this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
      this.durchschnittsbudgetmonat = (this.durchschnittsbudgetmonat * 100 / 100).toFixed(2);
      //console.log(this.myDaysInmonth);
      if (isNaN(parseInt(this.budget + ''))) {
        this.shownbudget = 0;
        this.singleValue = 0;
        this.durchschnittsbudgetmonat = 0;
      }
      //console.log(this.alleBeträge);
    });
  }

  onLink(url: string) {
    window.open(url);
  }
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }


  showStatistikPage() {
    var today = new Date();
    var date = new Date(today),
      locale = "de";
    this.monthFull = date.toLocaleString(locale, { month: "long" });
    this.month = today.getMonth();
    this.year = today.getFullYear();
    //console.log(this.globalvar.budget);
    console.log(this.globalvar.monatsübersicht.length);
    //console.log(this.year);
    this.globalvar.seteinkaufsliste(this.einkaufsliste);
    if (this.globalvar.monatsübersicht.length == 0) {
      this.globalvar.monatsübersicht.push({
        budget: this.globalvar.getbudget(),
        einkaufsliste: this.globalvar.geteinkaufsliste(),
        month: this.monthFull,
        year: this.year
      });
    }
    this.helplist = [];

    for (var i = 0; i < this.globalvar.monatsübersicht.length; i++) {
      this.helplist.push({
        month: this.globalvar.monatsübersicht[i].month,
        year: this.globalvar.monatsübersicht[i].year
      });
    }
    console.log(this.helplist);
    let prüfvar = 0;
    console.log(this.helplist.length);

    for (var i = 0; i < this.helplist.length; i++) {
      console.log(this.helplist[i].month);
      console.log(this.monthFull);
      if (this.helplist[i].month == this.monthFull && this.helplist[i].year == this.year) {
        this.globalvar.monatsübersicht[i] = {
          budget: this.globalvar.getbudget(),
          einkaufsliste: this.globalvar.geteinkaufsliste(),
          month: this.monthFull,
          year: this.year
        }
        prüfvar = 1;
      }

    }
    if (prüfvar == 0) {
      this.globalvar.monatsübersicht.push({
        budget: this.globalvar.getbudget(),
        einkaufsliste: this.globalvar.geteinkaufsliste(),
        month: this.monthFull,
        year: this.year
      });
    }
    console.log(prüfvar + " Prüfvar");

    this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    console.log(this.globalvar.monatsübersicht);

    this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    this.navCtrl.push(StatistikPage);
  }

  PlusListItem() {
    this.navCtrl.push(DetailsPage);
  }

  showNote(note, idx) {
    let contactModal = this.modalCtrl.create(ModalPage, { Id: idx });
    contactModal.onDidDismiss(() => {
      this.setAlleBeträge();
    });
    contactModal.present();

  }

  deleteNote(note) {
    let index = this.globalvar.einkaufsliste.indexOf(note);
    if (index > -1) {
      this.globalvar.einkaufsliste.splice(index, 1);
    }
    this.setAlleBeträge();
  }

  setAlleBeträge() {
    this.einkaufsliste = this.globalvar.einkaufsliste;
    this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
    this.alleBeträge = 0;
    for (var i = 0; i < this.einkaufsliste.length; i++) {
      if (this.einkaufsliste[i].plusminus == true) {
        this.alleBeträge -= parseInt(this.einkaufsliste[i].betrag);
      } else {
        this.alleBeträge += parseInt(this.einkaufsliste[i].betrag);
      }
    }
    this.singleValue = this.globalvar.getbudget() - this.alleBeträge;
  }
  ionViewCanLeave() {
    this.globalvar.einkaufsliste = this.einkaufsliste;
    this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
    //console.log(this.globalvar.einkaufsliste.length + " lenght canleave")
    this.storage.set('budget', this.globalvar.budget);
    this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    //console.log("Looks like I'm about to leave canLeave");
  }
  ionViewWillUnload() {
    this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
    this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    this.storage.set('budget', this.globalvar.budget);
    //console.log("Looks like I'm about to leave willunload");
  }

  helplist: helplist[] = [];
  clearDataListofMonth() {
    console.log(this.einkaufsliste);
    let alert = this.alertCtrl.create({
      title: 'Löschen?',
      message: 'Sind sie wirklich sicher, dass sie alle Daten in der Liste löschen wollen?',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            var today = new Date();
            var date = new Date(today),
              locale = "de";
            this.monthFull = date.toLocaleString(locale, { month: "long" });
            this.month = today.getMonth();
            this.year = today.getFullYear();
            this.einkaufsliste = [];
            this.globalvar.einkaufsliste = [];
            this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
            console.log('löschen der Liste');
            this.globalvar.setbudget(0);
            this.budget = 0;
            this.singleValue = 0;
            console.log(this.globalvar.monatsübersicht);
            let prüfvar = 0;

            for (var i = 0; i < this.globalvar.monatsübersicht.length; i++) {
              console.log(this.monthFull);
              if (this.globalvar.monatsübersicht[i].month == this.monthFull && this.globalvar.monatsübersicht[i].year == this.year) {
                this.globalvar.monatsübersicht[i] = {
                  budget: this.globalvar.getbudget(),
                  einkaufsliste: this.globalvar.geteinkaufsliste(),
                  month: this.monthFull,
                  year: this.year
                }
                prüfvar = 1;
              }

            }
            if (prüfvar == 0) {
              this.globalvar.monatsübersicht.push({
                budget: this.globalvar.getbudget(),
                einkaufsliste: this.globalvar.geteinkaufsliste(),
                month: this.monthFull,
                year: this.year
              });
            }
            this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
          }
        },
        {
          text: 'Nein',
          role: 'cancel',
          handler: () => {//donothing
          }
        }
      ]
    });
    alert.present();
  }
}

