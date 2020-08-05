import { Person } from "./person";

export class Retiree extends Person {

    constructor(public firstName: string, public lastName: string) {
        super();
    }

    getInfo() {
        return `Retiree ${this.firstName} ${this.lastName}`;
    }
}