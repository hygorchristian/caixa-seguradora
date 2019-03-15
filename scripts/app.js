const main = document.getElementById('main');

// Construindo funcao para carregar o json de um arquivo local para compatibilidade com o IE ===
const loadLocalJson = (path, callback) => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function () {
    if(xobj.readyState === 4 && xobj.status === "200")
      callback(JSON.parse(xobj.responseText));
  };
  xobj.send(null);
};

const renderCards = () => {
  fetch("./cards.json")
  .then(res => res.json())
  .then(list => {
    let htmlCards = '';
    list.forEach((item => {
      htmlCards += cardTemplate(item);
    }));
    main.innerHTML = htmlCards;
  })
};

const cardTemplate = (data) => {
  return `
    <div class="card cardTemplate" style="width: 20rem;">
      <div class="card-body">
        <h4 class="title">${data.title}</h4>
        <h6 class="subtitle mb-2 text-muted">${data.subtitle}</h6>
        <p class="text">${data.text}</p>
        <a href="${data.link}" class="link">${removeHttpOrHttps(data.link)}</a>
      </div>
    </div>
  `;
};


// Remove http, https ou www de uma string, para ficar mais 'amigável' ao usuário.
const removeHttpOrHttps = (url) => {
  return url.replace(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?/ , '')
};


const onDocumentReady = (callback) => {
  document.addEventListener("DOMContentLoaded", function(event) {
    callback(event);
  });
};

/// Executa quando a página tiver carregado

onDocumentReady((e) => {
  renderCards();
});

