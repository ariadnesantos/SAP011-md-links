#! /usr/bin/env node
//console.log('Oi, CLI!')
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