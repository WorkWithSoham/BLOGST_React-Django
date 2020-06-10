import {Backendlookup} from "../lookup";


export function ApiBlogCreate(RnewBlog, callback) {
    Backendlookup("POST", "/blogs/create-blog/", callback, {content: RnewBlog})
}

export function ApiBlogAction(blogId, action, callback) {
    const data = {id: blogId, action: action}
    Backendlookup("POST", "/blogs/action/", callback, data)
}

export function ApiBlogDetail(blogId, callback) {
    Backendlookup("GET", `/blogs/${blogId}`, callback)
}

export function ApiBlogFeed(callback, nextUrl) {
    let endpoint = "/blogs/feed/"
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", '')
    }
    Backendlookup("GET", endpoint, callback)
}

export function ApiBlogList(username, callback, nextUrl) {
    let endpoint = "/blogs/"
    if (username) {
        endpoint = `/blogs/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", '')
    }
    Backendlookup("GET", endpoint, callback)
}