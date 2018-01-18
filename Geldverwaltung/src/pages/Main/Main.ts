import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { DetailsPage } from '../DetailsPage/Details';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { ModalPage } from '../ModalPage/Modal';
import * as HighCharts from 'highcharts';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-Main',
    templateUrl: 'Main.html'
})
export class MainPage {
    budget: number;
    shownbudget: number = 0;
    singleValue: number;
    durchschnittsbudgetmonat: any = 0;
    myDaysInmonth: number;
    einkaufsliste: Array<any> = [];
    aktlmonth: any;
    showFooter: boolean = false;
    alleBeträge: number = 0;
    storagelength: any;
    constructor(public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController, private globalvar: GlobalVars, public alertCtrl: AlertController) {
        
    }

    ngOnInit() {
        Promise.all([
            this.storage.get('budget'),
            this.storage.get('einkaufsliste'),
            this.storage.length().then(result => {
                this.storagelength = result;
            })
        ]).then(([budget, einkaufsliste]) => {
            console.log(this.storagelength + " storage length");
            if (this.storagelength != 0)
            {
                if (this.budget == null)
                {
                    this.globalvar.setbudget(budget);
                    console.log(this.globalvar.budget +" globalvar budget ");
                }
                console.log(this.globalvar.einkaufsliste.length + " Einkaufsliste length ");
                if (this.globalvar.einkaufsliste.length == 0)
                {
                    this.globalvar.seteinkaufsliste(einkaufsliste);
                }               
            }          
            
            console.log("PROMISE " + this.globalvar.budget +" "+ this.globalvar.einkaufsliste.length);

            var today = new Date();
            var date = new Date(today),
                locale = "de"
            this.aktlmonth = date.toLocaleString(locale, { month: "long" });
            var month = today.getMonth();
            this.myDaysInmonth = this.daysInMonth(month + 1, today.getFullYear());

            this.budget = this.globalvar.budget;
            this.setAlleBeträge();
            this.shownbudget = this.globalvar.budget;
            this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
            this.durchschnittsbudgetmonat = (this.durchschnittsbudgetmonat * 100 / 100).toFixed(2);
            console.log(this.myDaysInmonth);

            if (isNaN(parseInt(this.budget + ''))) {
                this.shownbudget = 0;
                this.singleValue = 0;
                this.durchschnittsbudgetmonat = 0;
            }
            console.log(this.alleBeträge);
        });

        
    }

    onLink(url: string) {
        window.open(url);
    }
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    onchangebudget() {
        if (isNaN(parseInt(this.budget + ''))) {
            this.shownbudget = 0;
            this.singleValue = 0;
            this.durchschnittsbudgetmonat = 0;
        }
        else {
            this.globalvar.setbudget(this.budget);
            //console.log(this.budget + "= budgetaktuell");
            this.shownbudget = this.globalvar.getbudget();
            this.setAlleBeträge();
            //console.log(this.singleValue + "= singlevalue");
            this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
            this.storage.set('budget', this.globalvar.budget);
        }



    }
    showStatistikPage() {

    }

    PlusListItem() {
        this.navCtrl.push(DetailsPage);
    }


    showNote(note, idx) {

        //let prompt = this.alertCtrl.create({
        //    title: 'Ändere Eingabe',
        //    inputs: [
        //        {
        //            name: 'ueberschrift',
        //            placeholder: this.einkaufsliste[idx].ueberschrift
        //        },
        //        {
        //            name: 'betrag',
        //            placeholder: this.einkaufsliste[idx].betrag,
        //            type: 'number'
        //        },
        //        {
        //            name: 'kommentar',
        //            placeholder: this.einkaufsliste[idx].kommentar
        //        }
        //    ],
        //    buttons: [
        //        {
        //            text: 'Abbrechen'
        //        },
        //        {
        //            text: 'Speichern',
        //            handler: data => {
        //                //console.log(data.kommentar);
        //                //console.log(data.ueberschrift);
        //                let index = this.einkaufsliste.indexOf(note);
        //                if (data.ueberschrift.length == 0) {
        //                    data.ueberschrift = this.einkaufsliste[idx].ueberschrift;
        //                }
        //                if (data.betrag == "") {
        //                    data.betrag = this.einkaufsliste[idx].betrag;
        //                }
        //                if (data.kommentar == "") {
        //                    data.kommentar = this.einkaufsliste[idx].kommentar;
        //                }
        //                //console.log(data.kommentar);
        //                //console.log(data.ueberschrift);
        //                if (index > -1) {
        //                    this.einkaufsliste[index].ueberschrift = data.ueberschrift;
        //                    this.einkaufsliste[index].betrag = data.betrag;
        //                    this.einkaufsliste[index].kommentar = data.kommentar;
        //                }
        //            }
        //        }
        //    ]
        //});
        //prompt.present();

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
            this.alleBeträge += parseInt(this.einkaufsliste[i].betrag);
        }
        this.singleValue = this.globalvar.getbudget() - this.alleBeträge;
    }
    ionViewCanLeave() {
        this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
        console.log(this.globalvar.einkaufsliste.length+" lenght canleave")
        this.storage.set('budget', this.globalvar.budget);      
        console.log("Looks like I'm about to leave canLeave");
    }
    ionViewWillUnload() {
        this.storage.set('einkaufsliste', this.globalvar.einkaufsliste);
        this.storage.set('budget', this.globalvar.budget);
        console.log("Looks like I'm about to leave willunload");
    }
}

