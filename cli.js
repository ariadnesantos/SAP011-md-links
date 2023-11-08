#! /usr/bin/env node
//Manter console.log na cli.js

const { mdLinks, validateLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];

mdLinks(caminhoArquivo)
.then((conteudoArquivo) => {
    return validateLinks(conteudoArquivo).then(() => {
        for(const link of conteudoArquivo) {
            console.log(chalk.bgCyan.white.bold(link.text) +
            chalk.white.bold(' URL: ') +
            chalk.cyan(link.url) +
            chalk.white.bold(' Status: ') +
            (link.ok === 'ok' ? chalk.green(link.ok) : chalk.red(link.ok))
            );
    }
    });
})
.catch((err) => {
    console.error(chalk.red('Erro', err));
});




