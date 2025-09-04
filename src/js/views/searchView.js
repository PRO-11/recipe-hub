import View from './View';
class SearchView extends View{
    _parentEle=document.querySelector('.search');
    getQuery()
    {
        const data= this._parentEle.querySelector('.search__field').value
        this.clearInput()
        return data
    }
    clearInput()
    {
        this._parentEle.querySelector('.search__field').value=''
    }
    addHandlerRender(callback)
    {
        this._parentEle.addEventListener('submit',(e)=>{
            e.preventDefault();
            callback();
        })
    }

}
export default new SearchView()