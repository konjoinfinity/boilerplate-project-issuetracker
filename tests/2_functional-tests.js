const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST (create) request at /api/issues/apitest to create with all fields filled', () => {
        test('All fields filled (Valid) create issue',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .send({
                issue_title: 'title',
                issue_text: 'text',
                created_by: 'author',
                assigned_to: 'person',
                status_text: 'status',
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.issue_title, 'title');
              assert.equal(res.body.issue_text, 'text');
              assert.equal(res.body.created_by, 'author');
              assert.equal(res.body.assigned_to, 'person');
              assert.equal(res.body.open, true);
              assert.equal(res.body.status_text, 'status');
            
            });
            done();
          })
      })

      suite('POST (create) request at /api/issues/apitest to create with only required fields filled', () => {
        test('Required fields filled (Valid) create issue',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .send({
                issue_title: 'testtitle',
                issue_text: 'testtext',
                created_by: 'testby'
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.issue_title, 'testtitle');
              assert.equal(res.body.issue_text, 'testtext');
              assert.equal(res.body.created_by, 'testby');
              assert.equal(res.body.assigned_to, '');
              assert.equal(res.body.open, true);
              assert.equal(res.body.status_text, '');
            });
            done();
          })
      })

      suite('POST (create) request at /api/issues/apitest with missing required fields', () => {
        test('Missing required fields (Invalid) return error',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .send({
                issue_title: 'Invalid',
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body, { error: 'required field(s) missing' });
            });
            done();
          })
      })

      suite('GET (read) request at /api/issues/apitest for project list of issues', () => {
        test('(Valid) should return array of issues for :project',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 6);
            });
            done();
          })
      })

      suite('GET (read) request at /api/issues/apitest for single search query', () => {
        test('(Valid) should return array of issues that match query params',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest?status_text=title')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 1);
            });
            done();
          })
      })

      suite('GET (read) request at /api/issues/apitest for multiple search queries', () => {
        test('(Valid) should return array of issues that match multiple query params',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest?issue_title=title&&issue_text=text')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 1);
              
            });
            done();
          })
      })

      suite('DELETE (delete) request at /api/issues/apitest for specified _id', () => {
        test('(Valid) should return json for successful deletion',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .send({
                _id: '63fd234c6d68572ec9fb88b2',
              })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body, { result: 'successfully deleted', '_id': _id });
            });
            done();
          })
      })

      suite('DELETE (delete) request at /api/issues/apitest with a missing _id', () => {
        test('(Valid) should return an err for missing id',(done) => {
          chai
            .request(server)
            .get('/api/issues/apitest')
            .send({
                _id: 'notanid',
              })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body, { error: 'missing _id' });
            });
            done();
          })
      })

});

//       Create an issue with every field: POST request to /api/issues/{project}✅
//       Create an issue with only required fields: POST request to /api/issues/{project}✅
//       Create an issue with missing required fields: POST request to /api/issues/{project}✅
//       View issues on a project: GET request to /api/issues/{project}✅
//       View issues on a project with one filter: GET request to /api/issues/{project}✅
//       View issues on a project with multiple filters: GET request to /api/issues/{project}✅
//       Update one field on an issue: PUT request to /api/issues/{project}
//       Update multiple fields on an issue: PUT request to /api/issues/{project}
//       Update an issue with missing _id: PUT request to /api/issues/{project}
//       Update an issue with no fields to update: PUT request to /api/issues/{project}
//       Update an issue with an invalid _id: PUT request to /api/issues/{project}
//       Delete an issue: DELETE request to /api/issues/{project}✅
//       Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
//       Delete an issue with missing _id: DELETE request to /api/issues/{project}