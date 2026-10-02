import Module from "./module.module.js"
import Resource from "../resources/resource.module.js"

async function getModuleById(moduleId, collections = []) {

    let query = Module.findById(moduleId)

    collections.forEach(collection => {
        query = query.populate(collection)
    })

    return query
}


export { getModuleById }