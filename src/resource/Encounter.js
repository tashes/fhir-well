class EncounterResource extends Resource {
    constructor (resource) {
        super(resource)
    }

    getDate () {
        let timeField = moment(this._.resource.period.start);
        let date = timeField.format('DD/MM/YYYY');
        return date;
    }

    getType () {
        let typefield = this._.resource.type[0];
        return typefield.text;
    }

    getDoctorReferences () {
        let doctorsfield = this._.resource.participant;
        let doctorrefs = doctorsfield.map(doc => doc.individual.reference);
        return doctorrefs;
    }

    getOrganizationReference () {
        let organizationfield = this._.resource.serviceProvider;
        return organizationfield.reference;
    }

}