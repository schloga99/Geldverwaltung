import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
    budget: any;

    constructor() {
        this.budget = "";
      
    }
    public setbudget(value) {
        this.budget = value;
    }
    public getbudget() {
        return this.budget;
    }
}
