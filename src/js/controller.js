import * as model from './model.js'
import 'core-js/stable'
import icons from 'url:../img/icons.svg'
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
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
    await model.loadRecipe(id);
    
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
function init()
{
  recipeView.addHandleRender(getRecipe)
  searchView.addHandlerRender(searchResult);
  paginationView.addHandleClick(paginationControl)
}
init()
