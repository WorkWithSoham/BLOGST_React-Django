import {Backendlookup} from "../lookup";


export function ApiProfileDetail(username, callback) {
    Backendlookup("GET", `/profile/${username}`, callback)
}

export function ApiProfileFollow(username, action, callback) {
    const data = {action : `${action && action}`.toLowerCase()}
    Backendlookup("POST", `/profile/${username}/follow`, callback, data)
}