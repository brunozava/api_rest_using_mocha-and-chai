var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect

describe('suite', function(){
    it('meu primeiro teste', function(){
        expect(1).to.equals(1);
        console.log ("Meu primeiro teste.")
    })


})