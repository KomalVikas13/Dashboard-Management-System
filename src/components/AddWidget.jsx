import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { addWidget } from "../slice/slice";

const AddWidget = () => {
    const params = useParams();
    const categories = useSelector(state => state.categories)
    const category = categories.find(element => element.id == params.categoryId)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [formData, setFormData] = useState({
        id : category.widgets.length + 1,
        title : "",
        content : ""
    })
      
    const [errors, setErrors] = useState({
        title : "",
        content : ""
    })

    const formInput = (e) => {
        const {value, name} = e.target
        setFormData(prevData => ({
            ...prevData,
            [name] : value,
        }))
    }

    const validateForm = (e) => {
        const {name} = e.target
        const value = formData[name]
        if(!value.trim()){
            setErrors(prevData => ({
                ...prevData,
                [name] : "* " + name + " should not be empty"
            }))
        }else{
            setErrors(prevData => ({
                ...prevData,
                [name] : ""
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.title.trim()){
            setErrors(prevData => ({
                ...prevData,
                title : "* title should not be empty",
            }))
        }
        if(!formData.content.trim()){
            setErrors(prevData => ({
                ...prevData,
                content : "* content should not be empty",
            }))
        }else{
        dispatch(addWidget({categoryId : params.categoryId, widget : formData}));
        navigator("/");    
        }    
    };
    

    return  (
        <div className="d-flex justify-content-center align-items-center mt-5 mx-auto w-25 p-5 border rounded">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-medium">Widget title : </label>
                    <input type="text" className="form-control" name="title" onBlur={validateForm} onChange={formInput}/>
                    <div className="text text-danger">{errors.title.slice(0,2) + errors.title.charAt(2).toUpperCase() + errors.title.slice(3)}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-medium">Content : </label>
                    <textarea className="form-control" name="content" onBlur={validateForm} onChange={formInput}></textarea>
                    <div className="text text-danger">{errors.content.slice(0,2) + errors.content.charAt(2).toUpperCase() + errors.content.slice(3)}</div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default AddWidget