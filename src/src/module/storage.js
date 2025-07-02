const getTemplates = () =>{
    return JSON.parse(localStorage.getItem('templates')) ?? {length: 0}
}

const addTemplate = () =>{
    const data = getTemplates()
    const id = Date.now()
    data[id] = `template ${data.length + 1}`
    data.length++
    localStorage.setItem('templates', JSON.stringify(data))
    return [id, data[id]]
}

const editTemplate = (text) =>{
    const data = getTemplates()
    data[getId()] = text
    localStorage.setItem('templates', JSON.stringify(data))
}

const removeTemplate = () =>{
    const data = getTemplates()
    delete data[getId()]
    data.length--
    localStorage.setItem('templates', JSON.stringify(data))
}

const getId = () =>{
    return sessionStorage.getItem('id')
}

const setId = (id) =>{
    sessionStorage.setItem('id', id)
}

const removeId = () =>{
    sessionStorage.removeItem('id')
}

export {getTemplates, addTemplate, editTemplate, removeTemplate, getId, setId, removeId}