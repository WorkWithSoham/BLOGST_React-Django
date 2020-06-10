import React, {useEffect, useState} from "react";
import {ApiBlogList} from "./lookup";
import {Blog} from "./detail";

export function Bloglist(props) {
    const [blogsInit, setBlogsInit] = useState([])
    const [blogs, setBlogs] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [BlogsDidSet, setBlogsdidset] = useState(false)
    useEffect(() => {
        const final = ([...props.newBlogs].concat(blogsInit))
        if (final.length !== blogs.length) {
            setBlogs(final)
        }
    }, [props.newBlogs, blogs, blogsInit])

    useEffect(() => {
        if (BlogsDidSet === false) {
            const Bloglisthandle = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    setBlogsInit(response.results)
                    setBlogsdidset(true)
                }
            }
            ApiBlogList(props.username, Bloglisthandle)
        }
    }, [blogsInit, BlogsDidSet, setBlogsdidset, props.username])


    const handledidreBlog = (newBlogs) => {
        const UpdatedBlog = [...blogsInit]
        UpdatedBlog.unshift(newBlogs)
        setBlogsInit(UpdatedBlog)
        const UpdatedfinalBlog = [...blogs]
        UpdatedfinalBlog.unshift(blogs)
        setBlogs(UpdatedfinalBlog)
    }
    const handleLoadNext = (event) => {
        event.preventDefault()
        if (nextUrl !== null) {
            const handleLoadnext = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    const newBlogs = [...blogs].concat(response.results)
                    setBlogsInit(newBlogs)
                    setBlogs(newBlogs)
                } else {
                    alert("An error occurred!")
                }
            }
            ApiBlogList(props.username, handleLoadnext, nextUrl)
        }
    }

    return <React.Fragment>{blogs.map((item, index) => {
            return <Blog
                blog={item}
                didReblog={handledidreBlog}
                className='col-12 mx-auto w-75 border rounded bg-dark'
                key={`${index}-${item.id}`}/>
            })}
                { nextUrl !== null && <button onClick={handleLoadNext} className="btn btn-outline-danger">Next</button> }
            </React.Fragment>
}
