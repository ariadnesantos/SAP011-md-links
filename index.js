const fs = require('fs');
const chalk = require('chalk')

function mdLinks(caminhoDoArquivo, options = {}){ //Parâmetro options é um obj que contém configurações. O padrão é um objeto vazio.
  return new Promise(function(resolve, reject){
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
      if(err) reject(err);

      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; //https?: Corresponde a "http" ou "https", onde o ? torna o "s" opcional.

//Encontrar todos os links na string markdown
const links = []; //cria um array para armazenar os links encontrados
let match; //declara uma variável match para armazenar cada correspondência encontrada

//loop while encontra e processa todas as correspondências no texto
while((match = pattern.exec(data)) !== null) { //.exec  é usado para encontrar todas as correspondências da palavra "regex" no texto.
    const text = match[1]; //extração do texto da correspondência
    const url = match[2]; //extração do link da correspondência
    const link = { text, url }; //criação de um objeto link com o texto e a URL
    
    //Se a opção validate estiver presente, adiciona uma propriedade ok ao objeto link com valor false.
    if (options.validate) { //valor false indica que a validação ainda não foi realizada 
      link.ok = false; 
    }

    links.push(link);
}
      resolve(links);
    });
  });
}
//Implementar a função validateLinks, usando fetch

function validateLinks(links) { //função validateLinks aceita uma lista de links
  const linkPromises = links.map((link) => { //cria um array de Promises para cada link
    if (link.ok !== undefined) { //verifica se a propriedade 'ok' está presente no link, indicando que a validação é necessária
      return fetch(link.url) //Usa fetch para fazer uma requisição HTTP ao link e define a propriedade ok com base no status da resposta.
    .then((response) => {
      link.ok = response.status >= 200 && response.status < 400
      link.status = response.status 
    })
    .catch(() => {
      link.ok = false;
      link.status = 'Link com erro'
    });
    } else {
      return Promise.resolve(); //Se a validação não for necessária, resolve a Promise imediatamente
    }
  });
//Retorna uma Promise que será resolvida quando todas as Promises individuais de validação forem concluídas
  return Promise.all(linkPromises); 
}

module.exports = { mdLinks, validateLinks };
