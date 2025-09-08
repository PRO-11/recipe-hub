import {API_URL,API_KEY,RES_PAGE } from "./config";
import { getJSON, sendJSON } from "./helper";
export const state={
    recipe:{},
    search:{
        query:'',
        result:[],
        page:1,
        resultPerPage:RES_PAGE
    },
    bookmarks:[]
}
export const loadRecipe=async function(id)
{
    try{
        const res=await getJSON(`${API_URL}/${id}?key=${API_KEY}`)
        state.recipe=res.data.recipe
        
          if(state.bookmarks.some((d)=>d.id==state.recipe.id))
            state.recipe.bookmark=true;
          else
          state.recipe.bookmark=false;
      }catch(err){
        console.error(err)
        throw err
      }
}

export const searchRecipe=async function(keyword)
{
    try{
        state.search.query=keyword
        const res=await getJSON(`${API_URL}?search=${keyword}&key=${API_KEY}`)
        console.log(res)
        state.search.result=res.data.recipes
        state.search.page=1
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

export const updatenewServing=function(newservings)
{
  state.recipe.ingredients.forEach((ele)=>{
    ele.quantity=ele.quantity*newservings/state.recipe.servings
  })
  state.recipe.servings=newservings
}
export const storeBookmark=function()
{
  console.log(state.bookmarks)
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}
export const addBookMark=function(recipe)
{
    
    state.bookmarks.push(recipe)
    if(recipe.id===state.recipe.id) state.recipe.bookmark=true;
    storeBookmark()
}
export const deleteBookMark=function(id)
{
  const idx=state.bookmarks.findIndex((d)=>d.id==id)
  state.bookmarks.splice(idx,1);
  state.recipe.bookmark=false;
  storeBookmark()
}

export const addRecipe=async function(newrecipe)
{
  try{
  const ingredients=Object.entries(newrecipe).filter((d)=> d[0].startsWith("ingredient") && d[1].trim()!=='').map((d)=>{
    const arr=d[1].split(',').map(el=>el.trim())
    if(arr.length!=3)
      throw new Error("Invalid Input, Please use correct format")
    const [quantity,unit,description ]=arr
    return {quantity,unit,description}
  })
  const newobj={
    "title": newrecipe.title,
  "source_url": newrecipe.sourceUrl,
  "image_url": newrecipe.image,
  "publisher": newrecipe.publisher,
  "cooking_time": newrecipe.cookingTime,
  "servings": +newrecipe.servings,
  ingredients
  }
  const data=await sendJSON(`${API_URL}?key=${API_KEY}`,newobj)
  console.log(data)
  state.recipe=data.data.recipe
  state.recipe.bookmark=true
  addBookMark(state.recipe)
  }catch(err)
  {
    throw err
  } 

}


/*{
  "title": "TEST",
  "source_url": "TEST",
  "image_url": "TEST",
  "publisher": "TEST",
  "cooking_time": "23",
  "servings": "23",
 
}*/

function init()
{
  const data=localStorage.getItem('bookmarks')
  if(!data)
    return
  state.bookmarks=JSON.parse(data)
}
init();
