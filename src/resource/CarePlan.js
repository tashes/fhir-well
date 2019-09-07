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