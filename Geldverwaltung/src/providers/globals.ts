import { Injectable } from '@angular/core';
import { Einkaufsliste } from "../pages/Main/Einkaufsliste";

@Injectable()
export class GlobalVars {
    budget: number;

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
}
