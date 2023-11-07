const mdLinks = require('../index.js');
const { soma } = require('../index');

test('Soma de 2 e 3 deve retornar 5', () => {
  const resultado = soma(2, 3);
  expect(resultado).toBe(5);
});

/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
