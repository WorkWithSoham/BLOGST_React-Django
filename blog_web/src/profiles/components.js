import React from "react";

export function UserDisplay(props) {
    const {user, includeFullName, hidelink} = props
    const NameDisplay = includeFullName === true? `${user.FirstName} ${user.LastName}${' '}` : null
    return <React.Fragment>
        {NameDisplay}
        {hidelink === true ? `@${user.username}` : <Userlink username={user.username}>@{user.username}</Userlink>}
    </React.Fragment>
}

export function Userlink(props) {
    const {username} = props
    const handlelink = (event) => {
        window.location.href = `/profile/${username}`
    }
    return <span className='pointer' onClick={handlelink}>
        {props.children}
    </span>
}


export function UserPicture(props) {
    const {user, hidelink} = props
    const Userspan = <span className='px-3 py-2 rounded-circle bg-success text-white'>
               {user.username[0]}</span>
    return hidelink === true ? Userspan : <Userlink username={user.username}>{Userspan}</Userlink>
}
