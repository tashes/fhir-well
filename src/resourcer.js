module.exports = function (list) {
    let resources = list.filter(l => /^src\\resource\\(.+)/g.test(l)).map(l => /^src\\resource\\(.+).js/g.exec(l)[1]).filter(l => l !== 'Resource');
    console.log(resources);
    let txt = `function Resourcer (resource) {
        switch (resource.resource.resourceType) {
            ${
                resources.map(res => {
                    return `case "${res}":
                return new ${res}Resource(resource);
                break;`;
                }).join('\n')
            }
            default:
                return new Resource(resource);
                break;
        }
    }`;
    return txt;
};