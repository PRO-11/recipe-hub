import View from "./View"
import icons from 'url:../../img/icons.svg'
class ResultView extends View{
    _parentEle=document.querySelector('.results')
     _errorMsg="No matching result found for your query! Please try different word."
    _generateMarkup()
    {
        return this._data.map((ele)=>{
            return ` <li class="preview">
            <a class="preview__link " href="#${ele.id}">
              <figure class="preview__fig">
                <img src="${ele.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${ele.title}</h4>
                <p class="preview__publisher">${ele.publisher}</p>
              </div>
            </a>
          </li>`
        }).join('')
    }
}

export default new ResultView()