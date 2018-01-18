import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { MainPage } from '../Main/Main';
import { ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-Statistik',
    templateUrl: 'Statistik.html'

})
export class StatistikPage implements OnInit {
    monatsuebersicht: Array<any> = [];
    month: any;
    year: any;
    monthFull: any;
    helplist: helplist[] = [];
    aktluebersicht: Array<any> = [];
    budget: any;
    constructor(public alertCtrl: AlertController,public storage: Storage, private toastCtrl: ToastController, public navCtrl: NavController, private globalvar: GlobalVars) {

    }
    ngOnInit() {
        this.storage.get('monatsübersicht').then((val) => {
            this.monatsuebersicht = val;
        });
    }

    onLink(url: string) {
        window.open(url);
    }
    speichern() {
        var today = new Date();
        var date = new Date(today),
            locale = "de";
        this.monthFull = date.toLocaleString(locale, { month: "long" });
        this.month = today.getMonth();
        this.year = today.getFullYear();
        //console.log(this.globalvar.budget);
        console.log(this.globalvar.monatsübersicht.length);
        //console.log(this.year);
        if (this.globalvar.monatsübersicht.length == 0) {
            this.globalvar.monatsübersicht.push({
                budget: this.globalvar.getbudget(),
                einkaufsliste: this.globalvar.geteinkaufsliste(),
                month: this.monthFull,
                year: this.year
            });
        }      
        //this.monthFull = "february";
        //this.year = 2021;  
        
        this.helplist = [];

        for (var i = 0; i < this.globalvar.monatsübersicht.length;i++)
        {
            this.helplist.push({
                month: this.globalvar.monatsübersicht[i].month,
                year: this.globalvar.monatsübersicht[i].year
            });              
        }
        console.log(this.helplist);
        let prüfvar = 0;

        console.log(this.helplist.length);
        
        for (var i = 0; i < this.helplist.length; i++)
        {
            console.log(this.helplist[i].month);
            console.log(this.monthFull);
            if (this.helplist[i].month == this.monthFull && this.helplist[i].year == this.year )
            {
                this.globalvar.monatsübersicht[i] = {
                        budget: this.globalvar.getbudget(),
                        einkaufsliste: this.globalvar.geteinkaufsliste(),
                        month: this.monthFull,
                        year: this.year
                }
                prüfvar = 1;                
            }
            
        }
        if (prüfvar == 0)
        {
            this.globalvar.monatsübersicht.push({
                        budget: this.globalvar.getbudget(),
                        einkaufsliste: this.globalvar.geteinkaufsliste(),
                        month: this.monthFull,
                        year: this.year
                    });
        }
        console.log(prüfvar + " Prüfvar");      
        this.monatsuebersicht = this.globalvar.getmonatsübersicht();
        console.log(this.globalvar.getmonatsübersicht());

        this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    }
    zurueck() {
        this.navCtrl.push(MainPage);
    }

    deleteNote(note) {
        let index = this.globalvar.monatsübersicht.indexOf(note);

        if (index > -1) {
            this.globalvar.monatsübersicht.splice(index, 1);
        }
        this.monatsuebersicht = this.globalvar.getmonatsübersicht();
        this.storage.set('monatsübersicht', this.globalvar.monatsübersicht);
    }
    showNote(item, idx) {        
        this.aktluebersicht = this.monatsuebersicht[idx];        
        //console.log(this.aktluebersicht);
        this.budget = item.budget + " €";
        //console.log(this.budget);
        //console.log(item);
    }
    showKommentar(item, idx) {
        let alert = this.alertCtrl.create({
            title: 'Kommentar',
            subTitle: item.kommentar,
            buttons: ['Ok']
        });

        alert.present();
    }
}

export class helplist {
    constructor(public month: number, public year: number) { }
}

