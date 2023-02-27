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
                issue_title: 'Issue title',
                issue_text: 'Issue text',
                created_by: 'This author',
                assigned_to: 'That person',
                status_text: 'This is the status',
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.issue_title, 'Issue title');
              assert.equal(res.body.issue_text, 'Issue text');
              assert.equal(res.body.created_by, 'This author');
              assert.equal(res.body.assigned_to, 'That person');
              assert.equal(res.body.open, true);
              assert.equal(res.body.status_text, 'This is the status');
            });
            done();
          })
      })

});

//       Create an issue with every field: POST request to /api/issues/{project}
//       Create an issue with only required fields: POST request to /api/issues/{project}
//       Create an issue with missing required fields: POST request to /api/issues/{project}
//       View issues on a project: GET request to /api/issues/{project}
//       View issues on a project with one filter: GET request to /api/issues/{project}
//       View issues on a project with multiple filters: GET request to /api/issues/{project}
//       Update one field on an issue: PUT request to /api/issues/{project}
//       Update multiple fields on an issue: PUT request to /api/issues/{project}
//       Update an issue with missing _id: PUT request to /api/issues/{project}
//       Update an issue with no fields to update: PUT request to /api/issues/{project}
//       Update an issue with an invalid _id: PUT request to /api/issues/{project}
//       Delete an issue: DELETE request to /api/issues/{project}
//       Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
//       Delete an issue with missing _id: DELETE request to /api/issues/{project}