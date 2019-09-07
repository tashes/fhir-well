class GoalResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getDescription () {
        let descriptionField = this._.resource.description;
        return descriptionField.text;
    }
}