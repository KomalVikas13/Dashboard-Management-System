import {createSlice} from "@reduxjs/toolkit"
import ApplicationState from "../ApplicationState"

const Slice = createSlice({
    name : "slice",
    initialState : ApplicationState,
    reducers : {
        addWidget : (state, action) => {
            const {categoryId, widget} = action.payload
            const category = state.categories.find(cat => cat.id == categoryId);
            if(category){
                category.widgets = [...category.widgets,widget]
            }
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id == categoryId);
            if (category) {
                category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
            }
        },
        
        addCategory : (state, action) => {
            state.categories = [...state.categories, action.payload]
        },
        removeCategory : (state, action) => {
            const {categoryId} = action.payload
            state.categories = state.categories.filter(category => category.id != categoryId)
        },
        changeCategoryId : (state, action) => {
            const {currentId, changedId} = action.payload
            const [category] = state.categories.filter(category => category.id == currentId)
            if(category){
                category.id = changedId
            }
        },
        changeWidgetId : (state, action) => {
            const {currentId, changedId, categoryId} = action.payload
            const [category] = state.categories.filter(category => category.id == categoryId)
            if(category){
                const [widget] = category.widgets.filter(widget => widget.id == currentId)
                if(widget){
                    widget.id = changedId
                }
            }
        }
    }
})

export const {addWidget, removeWidget, addCategory, removeCategory, changeCategoryId, changeWidgetId} = Slice.actions
export default Slice.reducer