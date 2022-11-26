const {ipcRenderer} = require('electron')

const init = () => {
    const currentFileElement = document.getElementById('current-file')
    currentFileElement.innerText = localStorage.getItem('searchbarValue')
    const dataDirElement = document.getElementById('data-dir')
    dataDirElement.innerText = localStorage.getItem('dataDirectory')
}

init()

const onSearchbarChange = (e) => {
    localStorage.setItem('searchbarCurrentValue', e.target.value)
}

const onSearchbarKeydown = (e) => {
    if (e.key === 'Enter') {
        localStorage.setItem('searchbarValue', e.target.value)
        const currentFileElement = document.getElementById('current-file')
        currentFileElement.innerText = e.target.value
    }
}

const searchbarElement = document.getElementById('searchbar')
searchbarElement.addEventListener('input', onSearchbarChange)
searchbarElement.addEventListener('keydown', onSearchbarKeydown)

const onBrowseButtonClick = () => {
    ipcRenderer.invoke('dialog', 'showOpenDialog', {properties: ['openDirectory']}).then(
        ({canceled, filePaths}) => {
            if (!canceled) {
                localStorage.setItem('dataDirectory', filePaths[0])
                const dataDirElement = document.getElementById('data-dir')
                dataDirElement.innerText = filePaths[0]
            }
        }
    )
}

const browseButtonElement = document.getElementById('data-dir-browse')
browseButtonElement.addEventListener('click', onBrowseButtonClick)
