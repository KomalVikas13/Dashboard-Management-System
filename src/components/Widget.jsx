import { useDispatch } from "react-redux"
import { removeWidget } from "../slice/slice"

const Widget = (props) => {
    const {data, categoryId} = props
    const dispatch = useDispatch()
    const handleRemoveWidget = ()=>{
        console.log({categoryId : categoryId,widgetId : data.id})
        dispatch(removeWidget({categoryId : categoryId,widgetId : data.id}))
    }
    return(
        <>
            {
                data == null ? 

                <div className="card bg-white" style={{ width: "18rem", height: "12rem" }}>
                    <button type="button" className="btn btn-outline-secondary m-auto" style={{'--bs-border-opacity': .5}}><i className="fa-solid fa-plus"></i> Add Widget</button>
                </div>

                :
            
                <div className="card" style={{ width: "18rem", height: "12rem"  }}>
                    <div className="d-flex flex-row justify-content-between">
                        <h5 className="card-title text-center p-3 ">{data.title}</h5>
                        <i className="fa-solid fa-xmark float-end p-3" onClick={handleRemoveWidget}></i>
                    </div>
                    <div className="card-body mt-0">
                        <p className="card-text">{data.content}</p>
                    </div>
                </div>

            }
        </>
    )
}

export default Widget