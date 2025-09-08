import View from "./View";
import icons from 'url:../../img/icons.svg'
class addRecipeView extends View{
    _parentEle=document.querySelector('.upload')
    _overlay=document.querySelector('.overlay')
    _window=document.querySelector('.add-recipe-window ')
    _btnOpen=document.querySelector('.nav__btn--add-recipe')
    _btnClose=document.querySelector('.btn--close-modal')
    _msg='Recipe was uploded successfully'
    constructor()
    {
        super()
        this._addHandlershowModal()
        this._addHandlercloseModal()
    }
    _generateMarkup()
    {
             
    }
    toggleWindow()
    {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    _addHandlershowModal()
    {
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }
    _addHandlercloseModal()
    {
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
    }
    addHandlerUpload(callback)
    {
        this._parentEle.addEventListener('submit',function(e){
            e.preventDefault()
            const data=[...new FormData(this)]
            const res=Object.fromEntries(data)
            callback(res)
        })
    }
}

export default new addRecipeView()