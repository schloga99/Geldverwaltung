﻿import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
    budget: number =0;
    aktlbudget: number =0;

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
