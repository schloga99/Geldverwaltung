import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-Main',
    templateUrl: 'Main.html'
})
export class MainPage {

    constructor(public navCtrl: NavController) {
    }

    onLink(url: string) {
        window.open(url);
    }
}
