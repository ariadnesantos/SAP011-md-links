#! /usr/bin/env node
//Manter console.log na cli.js

const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
mdLinks(caminhoArquivo)
.then((conteudoArquivo) => {
    //console.log(chalk.bgCyan(conteudoArquivo))
    for(const link of conteudoArquivo){   //O loop for...of itera pelos objetos de link no array links
        console.log((chalk.bgCyan.white.bold(link.text) + chalk.white.bold(' URL: ') + chalk.cyan(link.url)));
    }
});
//#D307F4
const inputs = process.argv[2] //O segundo argumento do array de inputs fornece o caminho do arquivo
console.log(inputs);            
