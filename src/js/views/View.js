import icons from 'url:../../img/icons.svg'
export default class View{
    _data=''
    render(data,flag=1)
        {   
            if(!data || (Array.isArray(data) && !data.length))
                return this.renderError()
            this._data=data
            const res=this._generateMarkup()
        if(!flag)
          return res
            this._parentEle.innerHTML=''
            this._parentEle.insertAdjacentHTML('afterbegin',res);
        }
        showSpinner()
        {
          this._parentEle.innerHTML=''
            const ele= `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`
            this._parentEle.insertAdjacentHTML('afterbegin',ele)
        }
        update(data)
        {
          
          

            this._data=data
            const newMarkup=this._generateMarkup();
            const newDom=document.createRange().createContextualFragment(newMarkup)
            const newElements=Array.from(newDom.querySelectorAll('*'))
            const currElements=Array.from(this._parentEle.querySelectorAll('*'))
            newElements.forEach((newEl,i)=>{
              const currEle=currElements[i]
              if(!newEl.isEqualNode(currEle) && newEl.firstChild?.nodeValue.trim()!='')
                currEle.textContent=newEl.textContent

              if(!newEl.isEqualNode(currEle) ){
                Array.from(newEl.attributes).forEach((data)=>{
                  currEle.setAttribute(data.name,data.value)
                })
              }
            })
          
        }
    renderError(msg=this._errorMsg)
    {
       const htmlData=`<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`
          this._parentEle.innerHTML=''
          this._parentEle.insertAdjacentHTML('afterbegin',htmlData)
    }
    renderMessage(msg=this._msg)
    {
      const htmlData=`<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`
          this._parentEle.innerHTML=''
          this._parentEle.insertAdjacentHTML('afterbegin',htmlData)
    }
}