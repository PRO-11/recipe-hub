import icons from 'url:../../img/icons.svg'
export default class View{
    _data=''
    render(data)
        {   
            if(!data || (Array.isArray(data) && !data.length))
                return this.renderError()
            this._data=data
            const res=this._generateMarkup()
            console.log(res,this._parentEle,"\n")
            this._parentEle.innerHTML=''
            this._parentEle.insertAdjacentHTML('afterbegin',res);
        }
        showSpinner()
        {
            const ele= `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`
            this._parentEle.insertAdjacentHTML('afterbegin',ele)
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
}