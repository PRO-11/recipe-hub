import icons from 'url:../../img/icons.svg'
import  Fraction from  'fraction.js'
import previewView from './previewView';
import View from './View';
class bookMarks extends View{
    _parentEle=document.querySelector('.bookmarks__list');
    _data;
    _errorMsg="No bookmarks. Please bookmark recipe!!"
    addHandler(callback)
    {
        window.addEventListener('load',callback)
    }
    _generateMarkup()
    {
       return this._data.map((data)=> previewView.render(data,false)).join('')
    }
    
}



export default new bookMarks();