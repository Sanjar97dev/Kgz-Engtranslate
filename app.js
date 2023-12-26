
const inputs = document.querySelectorAll('input');
const btn = document.querySelector('button');
const list = document.querySelector('.list');

let wordLang = JSON.parse(localStorage.getItem('wordLanguage')) || [];

function showDictionary(array){
    list.innerHTML='';
    array.forEach(pair => {
        list.innerHTML += `<li>
        <div class='words_block'>
            <div class='dictionary_block'>
                <div class='kyrgyz'>
                    <h3>${pair.english}</h3>
                </div>
                <div class='english'>
                    <h3>${pair.kyrgyz}</h3>
                </div>
            </div>
            <div class='btn-block'>
                    <button class="delbtn" onclick="deleteList('${pair.english}')">X</button> 
                    <button class='editbtn' onclick="editbtn('${pair.english}')"><i class="bi bi-pencil"></i></button>
            </div>
            </div>
        </li>`;
    });
}

btn.onclick=()=>{
    const englishWord = inputs[0].value.trim();
    const kyrgyzWord = inputs[1].value.trim();

    if (englishWord||kyrgyzWord) {
        const newLang = {english: englishWord, kyrgyz:kyrgyzWord};

        wordLang.push(newLang);
        localStorage.setItem('wordLanguage', JSON.stringify(wordLang))
        showDictionary(wordLang);

        inputs[0].value = '';
        inputs[1].value = '';
    }
}

function editbtn(word){
    const wordEdit = wordLang.find(pair =>pair.english === word);
    if (wordEdit) {
        inputs[0].value = wordEdit.english;
        inputs[1].value = wordEdit.english;

        wordLang=wordLang.filter(pair => pair.english !== word);

        showDictionary(wordLang)

        localStorage.setItem('wordLanguage', JSON.stringify(wordLang));
    }
}

function deleteList(word) {
    wordLang = wordLang.filter(pair => pair.english != word)
    showDictionary(wordLang)
    localStorage.setItem('wordLanguage', JSON.stringify(wordLang))
}
