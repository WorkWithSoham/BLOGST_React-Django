import React, {useState} from "react";
import {ActionBtn} from "./buttons";
import {
    UserDisplay,
    UserPicture
} from "../profiles";


export function ParentReblogBlog(props) {
    const {blog} = props
    return blog.parent ?
        <Blog isReblog reblogger={props.reblogger} hideActions className={' '} blog={blog.parent}/> : null
}

//  export function ParentCommentBlog(props) {
//      const {blog} = props
//      return blog.parent ? <div className='row'>
//     <Blog className={' '} blog={blog.parent}/>
//          <div className='col-11 mx-auto p-3 border rounded'>
//          </div>
//      </div> : null
//  }

export function Blog(props) {
    const {blog, didReblog, hideActions, isReblog, reblogger} = props
    const [actionBlog, SetactionBlog] = useState(props.blog ? props.blog : null)
    let className = props.className ? props.className : 'col-12 mx-auto p-3 col-md-6 text-center'
    className = isReblog === true ? `${className} p-2 mx-auto border rounded` : className
    const path = window.location.pathname
    var match = path.match(/(?<blogid>\d+)/)
    const urlblogId = match ? match.groups.blogid : -1

    const isDetail = `${blog.id}` === `${urlblogId}`
    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${blog.id}`
    }
    const handlePerformAction = (newActionBlog, status) => {
        if (status === 200) {
            SetactionBlog(newActionBlog)
        } else if (status === 201) {
            if (didReblog) {
                didReblog(newActionBlog)
            }
        }
    }
    return <div className={className}><br/>
        {isReblog === true && <div className='mb-3'>
            <span className='px-1 small text-muted'>Reblogged by <UserDisplay user={reblogger} /></span>
        </div>}
        <div className='d-flex'>
            <div className=''>
                <UserPicture user={blog.user}/>
            </div>
            <div className='col-11 mx-auto'>
                {/*<ParentCommentBlog blog={blog}/>*/}
                <div>
                    <p>
                        <UserDisplay includeFullName user={blog.user} />
                    </p>
                    <p>{blog.content}</p>
                    <ParentReblogBlog blog={blog} reblogger={blog.user}/>
                </div>
                <br/>
                <div className='btn px-0'>
                    {(actionBlog && hideActions !== true) && <React.Fragment>
                        <ActionBtn blog={actionBlog} didPerformAction={handlePerformAction}
                                   action={{type: "like", display: "Likes"}}/>
                        <ActionBtn blog={actionBlog} didPerformAction={handlePerformAction}
                                   action={{type: "unlike", display: "Unlike"}}/>
                        <ActionBtn blog={actionBlog} didPerformAction={handlePerformAction}
                                   action={{type: "reblog", display: "ReBlog"}}/>
                        {/*<ActionBtn blog={actionBlog} didPerformAction = {handlePerformAction} action={{type: "comment", display: "Comment"}}/>*/}
                    </React.Fragment>
                    }
                    {isDetail === true ? null :
                        <button className="btn btn-outline-danger btn-sm" onClick={handleLink}>View</button>}
                </div>
            </div>
        </div>
    </div>
}