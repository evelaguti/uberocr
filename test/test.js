const expect = require('chai').expect
const uberocr = require('../src/uberocr')

describe('#uberocr', function (){
    this.timeout(15000);
    it("Es posible el reconocimiento de caracteres.", async () =>{
        const uber = await uberocr('https://www.yapo.cl/pg/0noZEXmu4uQ9EvV/Cgel7jUqj46LjvBRMzo0T0txd5A==.gif')
        const texto = uber.text.replace(/\r?\n|\r/g,"")
        console.log(texto)
        expect(texto).to.equal('+(56) 949259147')
    })
})