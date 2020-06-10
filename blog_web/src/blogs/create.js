import React from "react";
import {ApiBlogCreate} from "./lookup";


// Always use first letter capital for function in React.js //

export function BlogCreate(props) {
    const textAreaRef = React.createRef()
    const {didBlog} = props
    const handleBackendUpdate = (response, status) => {
        if (status === 201) {
            didBlog(response)
        } else {
            console.log(response)
            alert("An error occurred. Please try again later!")
        }
    }

    const handleSubmit = (event) => {
        // Backend request handler
        event.preventDefault()
        const newVal = textAreaRef.current.value
        ApiBlogCreate(newVal, handleBackendUpdate)

        textAreaRef.current.value = ''
    }
    return  <div className={props.className}>
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className='form-control' name='blogpost' placeholder='Your Blog...'>
                    </textarea>
                    <button type='submit' className='btn btn-danger'> Post</button>
                </form>
            </div>
}