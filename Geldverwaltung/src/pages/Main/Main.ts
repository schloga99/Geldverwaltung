import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../../src/app/app.component';
import { GlobalVars } from "../../providers/globals";
import { Events } from 'ionic-angular';

@Component({
    selector: 'page-Main',
    templateUrl: 'Main.html'
})
export class MainPage {
    
    shownbudget: number;
    constructor(public navCtrl: NavController, private globalvar: GlobalVars, public events: Events) {
        events.subscribe('menu:closed', () => {
            this.shownbudget = globalvar.getbudget();
        });
        
    }    

    onLink(url: string) {
        window.open(url);
    }

    MinusListItem() {
      
    }
    PlusListItem() {
        
    } 
    
}

