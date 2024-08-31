import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addCategory } from "../slice/slice";

const AddCategory = () => {
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [data, setdata] = useState({
        id : categories.length + 1,
        name: "",
        widgets: [
            {
                id : 0,
                title : "Default Widget",
                content : "content"
            }
        ]
    })
      
    const [errors, setErrors] = useState({
        name : "",
    })

    const formInput = (e) => {
        const {value, name} = e.target
        setdata(prevData => ({
            ...prevData,
            [name] : value,
        }))
    }

    const validateForm = (e) => {
        const {name} = e.target
        const value = data[name]
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
        if(!data.name.trim()){
            setErrors(prevData => ({
                ...prevData,
                name : "* name should not be empty",
            }))
        }
        else{
        dispatch(addCategory(data));
        navigator("/");    
        }    
    };
    

    return  (
        <div className="d-flex justify-content-center align-items-center mt-5 mx-auto w-25 p-5 border rounded">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-medium">Category title : </label>
                    <input type="text" className="form-control" name="name" onBlur={validateForm} onChange={formInput}/>
                    <div className="text text-danger">{errors.name.slice(0,2) + errors.name.charAt(2).toUpperCase() + errors.name.slice(3)}</div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default AddCategory