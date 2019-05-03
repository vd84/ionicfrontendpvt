export class Event {
    name: string;
    date: any;
    location: any;
    description: string;
    booked: boolean;

    constructor(name: string, date: any, location: any, description: any) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }
}
