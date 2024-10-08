import { useDispatch, useSelector } from "react-redux";
import Widget from "./Widget";
import { changeCategoryId, changeWidgetId } from "../slice/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeCategory } from "../slice/slice";

const Categories = () => {
            const categories = useSelector((state) => state.categories);
            const dispatch = useDispatch();
            const navigator = useNavigate()

            useEffect(() => {
                console.log(categories)
                if (categories.length > 0) {
                categories.forEach((category, catIndex) => {
                    dispatch(changeCategoryId({currentId : category.id, changedId : catIndex}));

                    category.widgets.forEach((widget, widgetIndex) => {
                    dispatch(changeWidgetId({currentId : widget.id, changedId : widgetIndex, categoryId : category.id}));
                    });
                });
                }
            }, [categories]);

            const addWidgetEvent = (categoryId)=>{
                navigator(`/addWidget/${categoryId}`)
            }
            const addCategoryEvent = () => {
                navigator(`addCategory`)
            }
            const removeCategoryEvent = (categoryId) => {
                console.log(categoryId)
                dispatch(removeCategory({categoryId : categoryId}))
            }


            return (
                <>
                <div className="d-flex flex-row justify-content-between align-items-center">
                        <p className="text w-25 mt-3 ms-3">Home {'>'} <b>DashboardV2</b></p>
                    <div className="d-flex w-25 bg-light-subtle border rounded align-items-center justify-content-left">
                        <i class="fa-solid fa-magnifying-glass ps-2"></i>
                        <input type="text" className="btn" placeholder="Search anything.."></input>
                    </div>
                    <div></div>
                </div>
                <div className="d-flex flex-column bg-light pt-3" style={{height : "100vh"}}>
                    <div className="d-flex flex-row border-bottom pb-2">
                        <h4 className="mt-3 ms-3 text-primary w-75">CNAPP Dashboard</h4>
                        <button type="button" className="btn btn-outline-secondary m-auto" style={{'--bs-border-opacity': .5}} onClick={addCategoryEvent}><i className="fa-solid fa-plus"></i> Add Category</button>
                        </div>
                    <div className="d-flex flex-column m-1 gap-3">
                    {categories.map((category, catIndex) => (
                        <div className="d-flex flex-column" key={catIndex}>
                            <div className="d-flex flex-row justify-content-between p-2">
                                <h5 className="text-secondary mt-3 text-primary w-75">{category.name}</h5>
                                <button type="button" className="btn btn-outline-danger align-self-center" style={{'--bs-border-opacity': .5}} onClick={() => removeCategoryEvent(category.id)}><i className="fa-solid fa-xmark"></i> Remove</button>
                                </div>
                            <div className="d-inline-flex flex-row flex-wrap mb-3">
                                {category.widgets.filter(widget => widget.id != 0).map((widget, widgetIndex) => (
                                    <div className="p-2" key={widgetIndex}>
                                        <Widget data={widget} categoryId={category.id} key={widgetIndex} />
                                    </div>
                                ))}
                                <div className="p-2" onClick={()=>addWidgetEvent(category.id)}>
                                    <Widget data={null}></Widget>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </>
            );
            };

export default Categories;
