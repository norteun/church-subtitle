const fs = require('fs')

const acronymMap = {
    창: "창세기",
    출: "출애굽기",
    레: "레위기",
    민: "민수기",
    신: "신명기"
}

const getKeyword = (searchValue, mode) => {
    if (mode === 'bible') {
        const number = searchValue.match(/\d+/)[0]
        return acronymMap[searchValue.split(number)[0]]
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
                        const lines = data.split('\n')
                        fileContentElement.innerText = lines.find((line) => line.includes(searchValue))
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
