export class User {

    id: number;
    name: String;
    role: number;
    currentYouthCentre: number;

    constructor(id: number, name: String, role: number, currentYouthCentre: number) {
        this.currentYouthCentre = currentYouthCentre;
        this.id = id;
        this.name = name;
        this.role = role;

    }



}
