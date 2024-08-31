import { useDispatch, useSelector } from "react-redux";
import Widget from "./Widget";
import { changeCategoryId, changeWidgetId } from "../slice/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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


            return (
                <div className="d-flex flex-column mb-3">
                {categories.map((category, catIndex) => (
                    <div className="d-flex flex-column mb-3" key={catIndex}>
                        <div className="p-2"><h2>{category.name}</h2></div>
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
            );
            };

export default Categories;
