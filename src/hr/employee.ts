import { Person } from "./person";
import { Reportable, HasSalary } from ".";

export class Employee extends Person implements Reportable, HasSalary {

    job: string;
    private _salary: number = 80_000;

    constructor(public firstName: string, public lastName: string) {
        super();
    }
    getReport(): string {
        return `Report for ${this.getInfo()}`
    }

    get salary(): number { return this._salary; }
    // set salary(newVal: number) { this._salary = newVal; }

    giveRaise(amount: number): void {
        this._salary += amount;
    }

    getInfo(): string {
        return `${this.job} ${this.firstName} ${this.lastName}`;
    }
}