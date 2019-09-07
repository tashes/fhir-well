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