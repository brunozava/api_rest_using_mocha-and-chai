import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

describe('post', () => {

    context('when i register a task', () => {

        let task = {title: 'Study AI', owner: 'zava@qa.com', done: false}
        
        it('should return 200', (done) => {
            request
                .post('/task/')
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.data.title).to.be.an('string')
                    expect(res.body.data.owner).to.be.an('string')
                    expect(res.body.data.done).to.be.an('boolean')
                    done()
                })
        })
    })

    context('when i do not inform the title', () => {
        let task = {title: '', owner: 'zava@qa.com', done: false}

            it('should return 400', (done) => {
                request
                    .post('/task/')
                    .end((err, res) => {
                        expect(res).to.has.status(400)
                        expect(res.body.errors.title.message).to.eql('Oops! Title is required.')
                        done()
                    })
            })
    })

    context('when i do not inform the owner', () => {
        let task = {title: 'Nova tarefa', owner: '', done: false}

            it('should return 400', (done) => {
                request
                    .post('/task/')
                    .end((err, res) => {
                        expect(res).to.has.status(400)
                        expect(res.body.errors.owner.message).to.eql('Oops! Owner is required.')
                        done()
                    })
            })
    })

    context('when the task already exists', () => {
        let task = {title: 'Planning the next travel', owner: 'zava@qa.com', done: false}

            before((done) => {
                request
                    .post('/task/')
                    .end((err, res) => {
                        expect(res).to.has.status(200)
                        done()
                    })
            })

            it('should return 409', (done) => {
                request
                    .post('/task/')
                    .end((err, res) => {
                        expect(res).to.has.status(409)
                        expect(res.body.errmsg).to.include('duplicate key')
                        done()
                    })
            })
    })
})