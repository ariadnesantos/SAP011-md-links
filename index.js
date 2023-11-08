const fs = require('fs');
const chalk = require('chalk')
//const fetch = require('node-fetch')

function mdLinks(caminhoDoArquivo){
  return new Promise(function(resolve, reject){
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
      if(err) reject(err);

      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; //https?: Corresponde a "http" ou "https", onde o ? torna o "s" opcional.

//Encontrar todos os links na string markdown
const links = []; //cria um array para armazenar os links encontrados
let match; //declara uma variável match para armazenar cada correspondência encontrada

//loop while encontra e processa todas as correspondências no texto
while((match = pattern.exec(data)) !== null) { //.exec  é usado para encontrar todas as correspondências da palavra "regex" no texto.
    const text = match[1];
    const url = match[2];
    links.push({ text, url }); //os objetos de link são adicionados ao array links
}
      resolve(links);
    });
  });
}
//Implementar a função validateLinks, usando fetch

function validateLinks(links) {
  const linkPromises = links.map((link) => {
    return fetch(link.url)
    .then((response) => {
      if(response.status >= 200 && response.status < 400) {
        link.ok = chalk.green('☑ OK');
      } else {
        link.ok = chalk.red('☒ FAIL');
      }
    })
    .catch(() => (link.ok = chalk.red('☒ FAIL')));
  });

  return Promise.all(linkPromises);
}

module.exports = { mdLinks, validateLinks };
