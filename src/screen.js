const fs = require('fs')

const loadFile = (filename) => {
    if (filename !== null) {
        const fileNameElement = document.getElementById('file-name')
        fileNameElement.innerText = filename
        const dataDirectory = localStorage.getItem('dataDirectory')
        fs.readdir(dataDirectory, (err, files) => {
            if (files.includes(filename)) {
                fs.readFile(`${dataDirectory}/${filename}`, 'utf-8', (err, data) => {
                    const fileContentElement = document.getElementById('file-content')
                    fileContentElement.innerText = data
                })
            }
        })
    }
}

loadFile(localStorage.getItem('searchbarValue'))

window.addEventListener('storage', (e) => {
    if (e.key === 'searchbarValue') {
        loadFile(e.newValue)
    }
})
