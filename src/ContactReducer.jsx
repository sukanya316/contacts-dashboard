import { createSlice } from "@reduxjs/toolkit";

const contactSlice=createSlice({
    name:'contacts',
    initialState:[],
    reducers:{
        addContact:(state,action)=>{
            state.push(action.payload)
        },
        deleteContact:(state,action)=>{
            console.log(action)
            return state.filter(contact=>contact.id!==action.payload.id)
            // state.filter(contact=>contact.)
        },
        saveEditedDetails:(state,action)=>{
            const {id}=action.payload
            state[id]=action.payload
            // const uu=state.find(contact=>contact.id===id)
            // console.log(uu)
            // if(uu){
            //     uu.isChecked=isChecked
            // }
        }   

    }
})
export const {addContact,deleteContact,saveEditedDetails} = contactSlice.actions;
export default contactSlice.reducer;