export const getItem = key => {
    try{
        return JSON.parse(localStorage.getItem(key))  //преобразуем строку из localStorage (хранилище браузера) в JSON
    }catch (e){
        console.log('Error getting data from localStorage', e)
        return null
    }
}


export const setItem = (key, data) => { //key - куда записываем, data - что записываем
    try{
        localStorage.setItem(key, JSON.stringify(data)) //JSON.stringify(data) упаковка в JSON
    }catch (e){
        console.log('Error saving data from localStorage', e)
    }
}