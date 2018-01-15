import { Injectable } from '@angular/core';
import { Einkaufsliste } from "../pages/Main/Einkaufsliste";

@Injectable()
export class GlobalVars {
    budget: number;
    aktlbudget: number =0;
    einkaufsliste: Einkaufsliste[] = [];
    constructor() {
        
    }
    public setbudget(value) {
        this.budget = value;
    }
    public getbudget() {
        return this.budget;
    }
    public setaktbudget(value) {
        this.aktlbudget = value;
    }
    public getaktbudget() {
        return this.aktlbudget;
    }
}
