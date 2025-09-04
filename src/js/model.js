import {API_URL,API_KEY,RES_PAGE } from "./config";
import { getJSON } from "./helper";
export const state={
    recipe:{},
    search:{
        query:'',
        result:[],
        page:1,
        resultPerPage:RES_PAGE
    }
}
export const loadRecipe=async function(id)
{
    try{
        const res=await getJSON(`${API_URL}/${id}`)
        state.recipe=res.data.recipe
        
      }catch(err){
        console.error(err)
        throw err
      }
}

export const searchRecipe=async function(keyword)
{
    try{
        state.search.query=keyword
        const res=await getJSON(`${API_URL}?search=${keyword}`)
        state.search.result=res.data.recipes
        console.log(state)
      }catch(err){
        console.error(err)
        throw err
      }
}
export const getSearchResultPage=function(page=state.search.page)
{
    state.search.page=page
    const start=(page-1)*state.search.resultPerPage
    const end=page*state.search.resultPerPage
    return state.search.result.slice(start,end);
}