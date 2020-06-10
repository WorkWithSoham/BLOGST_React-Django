import React, {useEffect, useState} from "react";
import {ApiProfileDetail, ApiProfileFollow} from "./lookup";
import {UserDisplay, UserPicture} from "./components";
import {DisplayCount} from "./utils";


function ProfileBadge(props) {
    const {user, didFollowtoggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    // currentVerb = profileLoading ? "Loading..." : currentVerb
    const HandleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowtoggle && !profileLoading) {
            didFollowtoggle(currentVerb)
        }
    }
    return user ? <div>
        <UserPicture user={user} hidelink />
        <h3 className="mx-2"><UserDisplay user={user} includeFullName hidelink/></h3>
        <div className="row mx-2">
            <p>
                {user.followers_count === 1 ? "Follower " : "Followers  "}{" "}
                <DisplayCount>{user.followers_count}</DisplayCount>
            </p>
            <p className="mx-3">
                Following  {" "}
                <DisplayCount>{user.following_count}</DisplayCount>
            </p>
        </div>
        <p></p>
        <p className="mx-2">
            {user.bio}
        </p>
        <button className="btn btn-danger" onClick={HandleFollowToggle}>{currentVerb}</button>
    </div> : null
}


export function ProfileBadgeComponent(props) {
    const {username} = props
    const [Didlookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        }
    }
    useEffect(() => {
        if (Didlookup === false) {
            ApiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, Didlookup, setDidLookup])

    const handleNewFollow = (Verb) => {
        ApiProfileFollow(username, Verb, (response, status) => {
            if (status === 200) {
                // setProfile(false)
                ApiProfileDetail(username, handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    return Didlookup === false ? "Loading..." : profile ?
        <ProfileBadge user={profile} didFollowtoggle={handleNewFollow} profileLoading={profileLoading}/> : null
}


