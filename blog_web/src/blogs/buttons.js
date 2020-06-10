import {ApiBlogAction} from "./lookup";
import React from "react";

export function ActionBtn(props) {
    const {blog, action, didPerformAction} = props
    const likes = blog.likes ? blog.likes : 0
    const className = props.className ? props.className : 'btn btn-danger btn-sm'
    const actiondisp = action.display ? action.display : 'Action'

    const HandleBackendAction = (response, status) => {
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        ApiBlogAction(blog.id, action.type, HandleBackendAction)
    }
    const display = action.type === 'like' ? `${likes} ${actiondisp}`: actiondisp
    return <button className={className} onClick={handleClick}>{display}</button>
}