import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

describe('get', () => {

    context('when i have registered tasks', () => {
        before((done) => {
            let tasks = [
                {title: 'Study NodeJs', owner: 'zava@qa.com', done:false},
                {title: 'Purchase Books', owner: 'zava@qa.com', done:false},
                {title: 'Study Automation', owner: 'zava@qa.com', done:true}
            ]
        })

        it('should return a list', (done) => {
            request
                .get('/task')
                .end((err,res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
                    done();
            })  
        })

        it('must filter by keyword', (done) => {
            request
                .get('/task')
                .query({title: 'Study'})
                .end((err,res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data[0].title).to.equal('Study NodeJs');
                    expect(res.body.data[1].title).to.equal('Study Automation');
                    done();
            })
        })
    })

    context('when i search by id', () => {

        it('should return just one task', (done) => {
            let tasks = [
                {title: 'Read a Javascript book', owner: 'zava@qa.com', done:false},
            ]

            let id = result[0]._id
            request
                .get('/task/' + id)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.equal(tasks[0].title)
                    done();
                })
        });
    })

    context('when the task does nnot exist', () => {

        it('should return 404', (done) => {
            
            request
                .get('/task/' + id)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.equal(tasks[0].title)
                    done();
                })
        });
    })

})