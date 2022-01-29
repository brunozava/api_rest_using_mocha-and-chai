import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

describe('delete', () => {

    context('when i delete a task', () => {
        let task = {
            id: 1,
            title: 'Pay the cell bill',
            owner: 'zava@qa.com',
            done: false
        }
    
        before((done) => {
            request
                .post('/task' + task.id)
                .end((erro, res) => {
                    expect(res).to.have.status(200)
                    done()
            })
        })

        it('should return 200', (done) => {
            request
                .delete('/task/' + task.id)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                    done()
            })
        })

        after((done) => {
            request
                .get('/task/' + task.id)
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    done()
            })
        })


    })

    context('when the task does not exist', () => {
        let id = 100;
        request
                .delete('/task/' + task.id)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                    done()
            })
    })


})