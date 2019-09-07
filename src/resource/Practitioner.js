class PractitionerResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getName () {
        let namefield = this._.resource.name[0];
        let name = `${namefield.prefix.join(' ')} ${namefield.given.join(' ')} ${namefield.family}`;
        return name;
    }
}