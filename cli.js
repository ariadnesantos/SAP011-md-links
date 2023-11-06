#! /usr/bin/env node
//Manter console.log na cli.js

const { soma, lerArquivo } = require('./index.js');
const chalk = require('chalk');

const resultado = soma(1,4);

console.log(chalk.magenta(resultado));

const caminhoArquivo = process.argv[2];
lerArquivo(caminhoArquivo)
.then((conteudoArquivo) => {
    console.log(chalk.bgCyan(conteudoArquivo))
});

const inputs = process.argv
console.log(inputs);

//Ler um link e exibir no console

//Exemplo de texto markdown
const markdownText = 'Este é [um exemplo de link](https://www.exemplo.com) em um arquivo Markdown.';
//Expressão regular para corresponder a links markdown
const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;

//Encontrar todos os links na string markdown
const links = []; //cria um array para armazenar os links encontrados
let match; //declara uma variável match para armazenar cada correspondência encontrada

//loop while encontra e processa todas as correspondências no texto
while((match = pattern.exec(markdownText)) !== null) {
    const text = match[1];
    const url = match[2];
    links.push({ text, url }); //os objetos de link são adicionados ao array links
}

//Exibir os links encontrados no console
for(const link of links){
    console.log('Texto do link: ' + link.text);
    console.log('URL: ' + link.url);
}