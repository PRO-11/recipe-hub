import View from "./View"
import icons from 'url:../../img/icons.svg'

class paginationView extends View{
    _parentEle=document.querySelector('.pagination')
   
    _generateMarkup()
    {
        const totalPage=Math.ceil(this._data.result.length/this._data.resultPerPage)
        const currPage=this._data.page
        if(currPage==1 && totalPage>1)
        {
            return this.#nextButton(currPage+1);
        }
        else if(currPage==totalPage && totalPage>1)
        {
            return this.#prevButton(currPage-1);
        }
        else if(currPage!=1)
        {
            const res1=this.#nextButton(currPage+1);
            const res2=this.#prevButton(currPage-1);
            return res1+res2;
        }
        return ''
    }
    #prevButton(num)
    {
        
        return ` <button goto=${num} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${num}</span>
          </button>`
    }
    #nextButton(num)
    {
        return ` <button goto=${num} class="btn--inline pagination__btn--next">
            <span>Page ${num}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>  `
    }
    addHandleClick(callback)
    {
        this._parentEle.addEventListener('click',(e)=>{
            const res=e.target.closest('.btn--inline')
            if(!res)
                return;
            callback(res.getAttribute('goto'))
        })
    }
}

export default new paginationView()