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