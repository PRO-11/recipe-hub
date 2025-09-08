import * as model from './model.js'
import 'core-js/stable'
import icons from 'url:../img/icons.svg'
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksViews from './views/bookmarksViews.js'
import addRecipeView from './views/addRecipeView.js'
import {MODAL_CLOSE_TIME} from '../js/config.js'
const recipeContainer = document.querySelector('.recipe');




// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io  //664c8f193e7aa067e94e8297
//664c8f193e7aa067e94e8a12
///////////////////////////////////////
const getRecipe=async function() {
  try{
    const id=window.location.hash.slice(1)
    if(!id)
      return;
    recipeView.showSpinner()
    resultsView.update(model.getSearchResultPage())
    await model.loadRecipe(id);
    bookmarksViews.update(model.state.bookmarks)
    recipeView.render(model.state.recipe)
  }catch(err)
  {
    console.error(err);
    recipeView.renderError()
  }

}
const searchResult=async function()
{
  try{
    const keyword=searchView.getQuery()
    resultsView.showSpinner()
    await model.searchRecipe(keyword)
    const res=model.getSearchResultPage()
    resultsView.render(res)
    paginationView.render(model.state.search)
  }
  catch(err)
  {
    console.error(err)
  }
}
function paginationControl(num)
{
  const res=model.getSearchResultPage(Number(num))
  resultsView.render(res)
  paginationView.render(model.state.search)
}
function servingControl(newservings)
{
  model.updatenewServing(newservings)
  recipeView.update(model.state.recipe)
}
function controlBookmark()
{
    if(!model.state.recipe.bookmark)
    model.addBookMark(model.state.recipe)
    else
    model.deleteBookMark(model.state.recipe)
    // console.log(model.state.recipe)
    bookmarksViews.render(model.state.bookmarks)
    recipeView.update(model.state.recipe)
}
const controlRenderBookmark=function()
{
  bookmarksViews.render(model.state.bookmarks)
}
const controlUploadRecipe=async function(data)
{
  try{
  addRecipeView.showSpinner()
  await model.addRecipe(data)
  addRecipeView.renderMessage()
  setTimeout(()=>{
    addRecipeView.toggleWindow()

  },MODAL_CLOSE_TIME*1000)
  recipeView.render(model.state.recipe)
  bookmarksViews.render(model.state.bookmarks)
  window.history.pushState(null,'',`#${model.state.recipe.id}`)
  }
  catch(e)
  {
    console.error(e)
    
    addRecipeView.renderError(e.message)
  }
}
function init()
{
  recipeView.addHandleRender(getRecipe)
  searchView.addHandlerRender(searchResult);
  recipeView.addHandleBookmark(controlBookmark)
  bookmarksViews.addHandler(controlRenderBookmark)
  paginationView.addHandleClick(paginationControl)
  addRecipeView.addHandlerUpload(controlUploadRecipe)
  recipeView.addHandlerServing(servingControl)
}
init()
