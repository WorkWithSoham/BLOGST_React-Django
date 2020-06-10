import React, {useEffect, useState} from "react";
import {BlogCreate} from './create'
import {Bloglist} from "./list";
import {Blog} from "./detail";
import {ApiBlogDetail} from "./lookup";
import {Feedlist} from "./feed";


export function BlogsComponent(props) {
    const [newBlogs, setnewBlogs] = useState([])
    const canBlog = props.canBlog !== 'false'
    const handleNewBlog = (newBlog) => {
        let tempNewBlogs = [...newBlogs]
        tempNewBlogs.unshift(newBlog)
        setnewBlogs(tempNewBlogs)
    }
    return <div className={props.className}>
        {canBlog === true && <BlogCreate didBlog={handleNewBlog} className='col-lg-6 offset-lg-3 mx-auto'/>}
        <Bloglist newBlogs={newBlogs} {...props}/>
    </div>
}


export function FeedsComponent(props) {
    const [newBlogs, setnewBlogs] = useState([])
    const canBlog = props.canBlog !== "false"
    const handleNewBlog = (newBlog) => {
        let tempNewBlogs = [...newBlogs]
        tempNewBlogs.unshift(newBlog)
        setnewBlogs(tempNewBlogs)
    }
    return <div className={props.className}>
        {canBlog === true && <BlogCreate didBlog={handleNewBlog} className='col-lg-6 offset-lg-3 mx-auto'/>}
        <Feedlist newBlogs={newBlogs} {...props}/>
    </div>
}

export function BlogDetailComponent(props) {
    const {blogId} = props
    const [Didlookup, setDidLookup] = useState(false)
    const [blog, setBlog] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setBlog(response)
        } else {
            console.log(response, status)
            alert("There was an error finding your blog!")
        }
    }
    useEffect(() => {
        if (Didlookup === false) {

            ApiBlogDetail(blogId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [blogId, Didlookup, setDidLookup])
    return blog === null ? null : <Blog blog={blog} className={props.className}/>
}

