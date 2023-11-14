#! /usr/bin/env node
//Manter console.log na cli.js

const { mdLinks, validateLinks } = require('./index.js');
const chalk = require('chalk');

const caminhoArquivo = process.argv[2];
const validateOptionIndex = process.argv.indexOf('--validate'); //Obtém o índice da opção --validate nos argumentos da linha de comando.

const options = {
    validate: validateOptionIndex !== -1 //Cria um objeto options que contém a opção validate com base na presença da opção --validate
};

mdLinks(caminhoArquivo, options)
.then((conteudoArquivo) => { 
    if(options.validate) {
        return validateLinks(conteudoArquivo).then(() => {
            for(const link of conteudoArquivo) {
                console.log(
                    chalk.bgCyan.white.bold(link.text) +
                    chalk.white.bold(' URL: ') +
                    chalk.cyan(link.url) +
                    (link.ok ? chalk.green('☑ OK ') : chalk.red('☒ FAIL ')) +
                    chalk.white.bold(' Status: ') +
                    chalk.dim(link.status)
                );
            }
        });
    } else {
         // Se não houver opção --validate, apenas imprime os links
      for (const link of conteudoArquivo) {
        console.log(chalk.bgCyan.white.bold(link.text) + chalk.white.bold(' URL: ') + chalk.cyan(link.url));
      }
    }
})

.catch((err) => {
    console.error(chalk.red('Erro', err));
  });
