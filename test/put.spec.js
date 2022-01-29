import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

describe('put', () => {

    context('when i edit a task'), () => {

        let task = {
            id: 111,
            title: "Buy Candies",
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

        it('should return 200', () => {
            task.title = 'Buy Snacks',
            task.done = true
            request
                .put('/task/' + task.id)
                .send(task)
                .end((err,res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
            })
        })

        it('should be updated', () => {
            request
            .get('/task/' + task.id)
            .end((err,res) => {
                expect(res).to.have.status(200)
                expect(res.body.data.title).to.eql(task.title)
                expect(res.body.data.done).to.be.true
            })
        })
    }

})