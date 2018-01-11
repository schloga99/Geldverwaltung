import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { DetailsPage } from '../DetailsPage/Details';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'page-Main',
    templateUrl: 'Main.html'
    
})
export class MainPage{
    budget: number;
    shownbudget: number=0;
    aktlbudget: any =0;
    singleValue: number;
    durchschnittsbudgetmonat: number=0;
    myDaysInmonth: number;
    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {

        
    }
    ngOnInit() {
        
        var today = new Date();
        var month = today.getMonth();
        this.myDaysInmonth = this.daysInMonth(month + 1, today.getFullYear());
        this.budget = this.globalvar.budget;
        this.shownbudget = this.globalvar.budget;
        this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
        console.log(this.myDaysInmonth);
        console.log(this.budget);
        console.log(this.shownbudget);
        console.log(this.globalvar.budget);
        
    }

    onLink(url: string) {
        window.open(url);
    }
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    onchangebudget() {
        if (isNaN(parseInt(this.budget+'')))
        {
            this.shownbudget = 0;
            this.singleValue = 0;
            this.durchschnittsbudgetmonat = 0;
        }
        else {
            this.globalvar.setbudget(this.budget);
            console.log(this.budget + "= budgetaktuell");
            this.shownbudget = this.globalvar.getbudget();
            this.singleValue = this.globalvar.getbudget();//noch falsch muss aktlbudget sein
            //console.log(this.singleValue + "= singlevalue");
            this.durchschnittsbudgetmonat = this.budget / this.myDaysInmonth;
        }
        
       
    }

    MinusListItem() {

    }
    PlusListItem() {
        this.navCtrl.push(DetailsPage);
    }

}

