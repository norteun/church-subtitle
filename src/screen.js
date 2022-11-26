const fs = require('fs')

const acronymMap = {
    창: "창세기",
    출: "출애굽기",
    레: "레위기"
}

const getKeyword = (searchValue, mode) => {
    if (mode === 'bible') {
        return acronymMap[searchValue.split(' ')[0]]
    }
}

const loadFile = (searchValue) => {
    if (searchValue !== null) {
        const searchValueElement = document.getElementById('search-value')
        searchValueElement.innerText = searchValue
        const mode = localStorage.getItem('mode')
        const dataDirectory = `${localStorage.getItem('dataDirectory')}/${mode}`

        const keyword = getKeyword(searchValue, mode)

        fs.readdir(dataDirectory, (err, files) => {
            for (let file of files) {
                if (file.includes(keyword)) {
                    fs.readFile(`${dataDirectory}/${file}`, 'utf-8', (err, data) => {
                        const fileContentElement = document.getElementById('file-content')
                        fileContentElement.innerText = data
                    })
                    break
                }
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
