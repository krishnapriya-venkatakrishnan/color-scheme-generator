let inpColorVal = "fff"
let colorMode = "monochrome"
const inpColorEl = document.querySelector('.inp-color')
inpColorEl.addEventListener('change', function(){
    inpColorVal = inpColorEl.value
})


document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
  this.querySelector('.custom-select').classList.toggle('open');
});

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener('click', function() {
    if (!this.classList.contains('selected')) {
      document.querySelector('.custom-option.selected')?.classList.remove('selected');
      document.querySelector('.highlight')?.classList.remove('highlight');
      this.classList.add('selected');
      this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent.trim();
      document.getElementById(this.dataset.value).classList.toggle('highlight')
    }
  });
}

window.addEventListener('click', function(e) {
  const select = document.querySelector('.custom-select');
  if(e.target.id === 'get-colors'){
    if (inpColorVal.split('#')[1])
        inpColorVal = inpColorVal.split('#')[1]
    let hexColorsArr = []
    fetch(`https://www.thecolorapi.com/scheme/?hex=${inpColorVal}&mode=${colorMode}&count=6`)
        .then(response => response.json())
        .then(data => {
            const colsArray = data.colors
            colsArray.forEach(function(col){
                hexColorsArr.push(col.hex.value)
            })
        buildColorScheme(hexColorsArr)
        })
  } else if(e.target.dataset.value) {
        colorMode = e.target.dataset.value   
  } else if(e.target.dataset.copy) {
    copyToClipboard(e.target.dataset.copy)
  } else if (!select.contains(e.target)) {
    select.classList.remove('open');
  }
});

function buildColorScheme(hexColsArr){
    for (let i=0; i< hexColsArr.length; i++){
        const colDiv = document.getElementById(`color-${i}`)
        colDiv.style.backgroundColor = hexColsArr[i]
        colDiv.dataset.copy = hexColsArr[i]
        
        const hexColDiv = document.getElementById(`hexColor-${i}`)
        hexColDiv.innerHTML = `${hexColsArr[i]}`
        hexColDiv.dataset.copy = hexColsArr[i]
    }
    
}

function copyToClipboard(textToCopy) {
    
    const tempTextarea = document.getElementById('copy');
    tempTextarea.classList.remove('disappearCopy')
    tempTextarea.value = textToCopy;
    
    tempTextarea.select();
    document.execCommand('copy');
    tempTextarea.value = `Copied the hex color value: ${textToCopy}`;
    tempTextarea.classList.add('disappearCopy')
}
