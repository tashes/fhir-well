/** SECTION: src\main.js **/

class Well {
    constructor (resources) {
        this._ = resources;
    }

    i (index) {
        return Resourcer(this._[index]);
    }

    getResourceByReference (ref) {
        let resource = this._.find(res => res.fullUrl === ref);
        return Resourcer(resource);
    }

    getResourcesByReferences (refs) {
        let resources = refs.map(ref => Resourcer(this._.find(res => res.fullUrl === ref)));
        return resources;
    }

    getResources (name) {
        return new Well(this._.filter(res => res.resource.resourceType === name));
    }

    slice (i) {
        return new Well(this._.slice(i));
    }

    map (cb) {
        return this._.map(function (resource, index, arr) {
            return cb(Resourcer(resource), index, new Well(arr));
        });
    }

    filter (cb) {
        return new Well(this._.filter(function (resource, index, arr) {
            return cb(Resourcer(resource), index, new Well(arr));
        }));
    }
}
/** SECTION: src\resourcer.js() **/

function Resourcer (resource) {
        switch (resource.resource.resourceType) {
            case "CarePlan":
                return new CarePlanResource(resource);
                break;
case "Claim":
                return new ClaimResource(resource);
                break;
case "Encounter":
                return new EncounterResource(resource);
                break;
case "Goal":
                return new GoalResource(resource);
                break;
case "Observation":
                return new ObservationResource(resource);
                break;
case "Organization":
                return new OrganizationResource(resource);
                break;
case "Patient":
                return new PatientResource(resource);
                break;
case "Practitioner":
                return new PractitionerResource(resource);
                break;
            default:
                return new Resource(resource);
                break;
        }
    }
/** SECTION: src\resource\CarePlan.js **/

class CarePlanResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    isActive () {
        let active = this._.resource.status === 'active';
        return active;
    }

    getConditions () {
        let conditionField = this._.resource.category;
        let conditions = conditionField.map(condition => condition.text);
        return conditions;
    }
    
    getActivities () {
        let activitiesField = this._.resource.activity;
        let activities = activitiesField.map(activity => activity.detail.code.text);
        return activities;
    }
    
    getEncounterReference () {
        let encounterField = this._.resource.encounter;
        return encounterField.reference;
    }

    getGoalReferences () {
        let goalsField = this._.resource.goal;
        if (goalsField !== undefined) {
            return goalsField.map(goal => goal.reference);
        }
        else {
            return undefined;
        }
    }
}
/** SECTION: src\resource\Claim.js **/

class ClaimResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getAmount () {
        let amountField = this._.resource.total;
        var currency_symbols = {
            'USD': '$', // US Dollar
            'EUR': '€', // Euro
            'CRC': '₡', // Costa Rican Colón
            'GBP': '£', // British Pound Sterling
            'ILS': '₪', // Israeli New Sheqel
            'INR': '₹', // Indian Rupee
            'JPY': '¥', // Japanese Yen
            'KRW': '₩', // South Korean Won
            'NGN': '₦', // Nigerian Naira
            'PHP': '₱', // Philippine Peso
            'PLN': 'zł', // Polish Zloty
            'PYG': '₲', // Paraguayan Guarani
            'THB': '฿', // Thai Baht
            'UAH': '₴', // Ukrainian Hryvnia
            'VND': '₫', // Vietnamese Dong
        };
        let amount = `${ ((currency_symbols[amountField.currency] !== undefined) ? (currency_symbols[amountField.currency]) : (amountField.currency) + ':') }${amountField.value}`;
        return amount;
    }

    getItems () {
        let itemsField = this._.resource.item;
        let items = itemsField.map(function (item) {
            return item.productOrService.text;
        });
        return items;
    }
}
/** SECTION: src\resource\Encounter.js **/

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
/** SECTION: src\resource\Goal.js **/

class GoalResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getDescription () {
        let descriptionField = this._.resource.description;
        return descriptionField.text;
    }
}
/** SECTION: src\resource\Observation.js **/

class ObservationResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getName () {
        let nameField = this._.resource.code;
        return nameField.text;
    }

    getValue () {
        let valueField = this._.resource.valueQuantity;
        return `${valueField.value.toFixed(2)} ${valueField.unit}`;
    }
}
/** SECTION: src\resource\Organization.js **/

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
/** SECTION: src\resource\Patient.js **/

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
/** SECTION: src\resource\Practitioner.js **/

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
/** SECTION: src\resource\Resource.js **/

class Resource {
    constructor (resource) {
        this._ = resource;
    }
}