import View from "./View"
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView"
class ResultView extends View{
    _parentEle=document.querySelector('.results')
     _errorMsg="No matching result found for your query! Please try different word."
    _generateMarkup()
       {
          return this._data.map((data)=> previewView.render(data,false)).join('')
       }
}

export default new ResultView()