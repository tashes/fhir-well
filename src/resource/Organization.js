class OrganizationResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getName () {
        let name = this._.resource.name;
        return name;
    }

    getCity () {
        let addressField = this._.resource.address[0];
        return addressField.city;
    }
}