#! /usr/bin/env node
//Manter console.log na cli.js

const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
mdLinks(caminhoArquivo)
.then((conteudoArquivo) => {
    //console.log(chalk.bgCyan(conteudoArquivo))
    for(const link of conteudoArquivo){   //O loop for...of itera pelos objetos de link no array links
        console.log((chalk.cyan(link.text) + ' URL: ' + link.url));
    }
});

const inputs = process.argv
console.log(inputs);

