import { addTemplate, getTemplates, setId, getId, removeTemplate, editTemplate } from './module/storage.js'
import './style/style.scss'

const elementListTemplates = document.querySelector('.list-templates')
const elementAddButton = document.querySelector('.main__button--add')
const elementRemoveButton = document.querySelector('.main__button--remove')
const elementEditForm = document.querySelector('.main__edit-form')
const elementInsertButton = document.querySelector('.main__insert')
const elementTextarea = document.querySelector('.main__textarea')

let elementActiveItem = undefined

const renderTemplates = () =>{
    const data = getTemplates()
    elementListTemplates.innerHTML = ''
    for (let key in data){
        if (key === 'length') continue
        elementListTemplates.insertAdjacentHTML('beforeend',
            `<li class="list-templates__item ${key === getId() && 'list-templates__item--active'}" data-js-id="${key}">${data[key]}</li>`
        )
    }
}

const showEditMenu = () =>{
    const data = getTemplates()
    elementEditForm.classList.remove('hidden')
    elementEditForm.elements.text.value = data[getId()]
}

const hideEditMenu = () =>{
    elementEditForm.classList.add('hidden')
}

const updateSelect = (isRemove = false) =>{
    const elementsSelect = document.querySelectorAll('.main__select')
    let newOption = ''
    const data = getTemplates()

    elementsSelect.forEach((element)=>{
        if(isRemove && getId() === element.value){
            newOption += `<option value="ERROR" class="error" selected disabled>ERROR</option>`
        }

        for (let key in data){
            if (key === 'length') continue

            newOption += `<option value="${key}" ${element.value === key && 'selected'}>${data[key]}</option>`
        }
        element.innerHTML = newOption
        newOption = ''
    })
}


elementListTemplates.addEventListener('click', ({target}) =>{
    if(!target.closest('.list-templates__item') || target === elementActiveItem) return

    elementActiveItem?.classList.remove('list-templates__item--active')
    target.classList.add('list-templates__item--active')
    setId(target.getAttribute('data-js-id'))

    showEditMenu()

    elementActiveItem = target
})


elementAddButton.addEventListener('click', ()=>{
    const [id, text] = addTemplate()
    elementListTemplates.insertAdjacentHTML('beforeend',
        `<li class="list-templates__item" data-js-id="${id}">${text}</li>`
    )
    updateSelect()
})

elementRemoveButton.addEventListener('click', ()=>{
    if(!getId()) return

    elementActiveItem.remove()
    hideEditMenu()
    removeTemplate()
    updateSelect(true)
})


elementEditForm.elements.text.addEventListener('change', ({target})=>{
    const {value} = target
    editTemplate(value)
    elementActiveItem.textContent = value
    updateSelect()
})

elementEditForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const value = elementEditForm.elements.text.value
    editTemplate(value)
    elementActiveItem.textContent = value
    updateSelect
})


elementInsertButton.addEventListener('click', () =>{
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);

    if (!elementTextarea.contains(range.commonAncestorContainer)) return

    const data = getTemplates()
    const select = document.createElement('select');
    select.classList.add('main__select')

    for (let key in data){
        if (key === 'length') continue

        select.innerHTML += `<option value="${key}">${data[key]}</option>`
    }

    range.insertNode(select)

    range.setStartAfter(select);
    range.setEndAfter(select);
    selection.removeAllRanges();
    selection.addRange(range);
})

renderTemplates()
elementActiveItem = document.querySelector('.list-templates__item--active')

elementActiveItem && showEditMenu()