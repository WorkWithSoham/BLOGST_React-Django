import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {FeedsComponent, BlogsComponent, BlogDetailComponent} from "./blogs";
import {ProfileBadgeComponent} from "./profiles";


const e = React.createElement
const BlogsEl = document.getElementById('blogst')
if (BlogsEl) {
    ReactDOM.render(e(BlogsComponent, BlogsEl.dataset), BlogsEl)
}


const BlogsFeedEl = document.getElementById('blogst-feed')
if (BlogsFeedEl) {
    ReactDOM.render(e(FeedsComponent, BlogsFeedEl.dataset), BlogsFeedEl)
}


const BlogDetailElement = document.querySelectorAll(".blogst-detail")

BlogDetailElement.forEach(container => {
    ReactDOM.render(
        e(BlogDetailComponent, container.dataset), container)
})

const ProfileBadgeElement = document.querySelectorAll(".blogst-profile-badge")
ProfileBadgeElement.forEach(container => {
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset), container)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
