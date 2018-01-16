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
@Component({
    selector: 'page-Main',
    templateUrl: 'Main.html'

})
export class MainPage {
    budget: number;
    shownbudget: number = 0;
    aktlbudget: any = 0;
    singleValue: number;
    durchschnittsbudgetmonat: any = 0;
    myDaysInmonth: number;
    einkaufsliste: Array<any> = [];
    aktlmonth: any;
    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private globalvar: GlobalVars, public alertCtrl: AlertController) {}
    ngOnInit() {

        var today = new Date();
        var date = new Date("10/11/2009"),
            locale = "de"
            this.aktlmonth = date.toLocaleString(locale, { month: "long" });
        var month = today.getMonth();
        this.myDaysInmonth = this.daysInMonth(month + 1, today.getFullYear());
        this.budget = this.globalvar.budget;
        this.shownbudget = this.globalvar.budget;
        this.singleValue = this.globalvar.getbudget();
        this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
        this.durchschnittsbudgetmonat = (this.durchschnittsbudgetmonat * 100 / 100).toFixed(2);
        console.log(this.myDaysInmonth);
        //console.log(this.budget);
        //console.log(this.shownbudget);

        if (isNaN(parseInt(this.budget + ''))) {
            this.shownbudget = 0;
            this.singleValue = 0;
            this.durchschnittsbudgetmonat = 0;
        }
        this.einkaufsliste = this.globalvar.einkaufsliste;
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
            this.singleValue = this.globalvar.getbudget();//noch falsch muss aktlbudget sein
            //console.log(this.singleValue + "= singlevalue");
            this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
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
        contactModal.present();

    }

    deleteNote(note) {

        let index = this.einkaufsliste.indexOf(note);

        if (index > -1) {
            this.einkaufsliste.splice(index, 1);
        }
    }
}

