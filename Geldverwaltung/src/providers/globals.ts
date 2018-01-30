import { Injectable } from '@angular/core';
import { Einkaufsliste } from "../pages/Main/Einkaufsliste";
import { Monatsübersicht } from "../pages/Statistik/Monatsübersicht";
@Injectable()
export class GlobalVars {
    budget: number=0;
    monatsübersicht: Monatsübersicht[] = [];
    einkaufsliste: Einkaufsliste[] = [];

   
    constructor() {

    }
    public setbudget(value) {
        this.budget = value;
    }
    public getbudget() {
        return this.budget;
    }
    public seteinkaufsliste(value) {
        this.einkaufsliste = value;
    }
    public geteinkaufsliste() {
        return this.einkaufsliste;
    }
    public setmonatsübersicht(value) {
        this.monatsübersicht = value;
    }
    public getmonatsübersicht() {
        return this.monatsübersicht;
    }
}

