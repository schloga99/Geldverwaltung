import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
    budget: any;
    aktlbudget: any;

    constructor() {
        this.budget = "";
      
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
