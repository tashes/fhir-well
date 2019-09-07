class PatientResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getName () {
        let namefield = this._.resource.name.find(ns => ns.use === 'official');
        let name = `${namefield.prefix[0]} ${namefield.given.join(' ')} ${namefield.family}`;
        return name;
    }

    getBirthday () {
        let birthdate = this._.resource.birthDate;
        return birthdate;
    }

    getAddress () {
        let addressField = this._.resource.address[0];
        let address = `${addressField.city}, ${addressField.state}, ${addressField.country}`;
        return address;
    }

    getEmail () {
        return undefined;
    }

    getContact () {
        let contactField = this._.resource.telecom.find(s => s.system === 'phone');
        return contactField.value;
    }
}