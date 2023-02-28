const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);
let deleteID;

suite('Functional Tests', function() {
  
    suite('POST tests', () => {
        test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .post("/api/issues/projects")
              .set("content-type", "application/json")
              .send({
                issue_title: "Issue",
                issue_text: "Functional Test",
                created_by: "fCC",
                assigned_to: "Dom",
                status_text: "Not Done",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                deleteID = res.body._id;
                assert.equal(res.body.issue_title, "Issue");
                assert.equal(res.body.assigned_to, "Dom");
                assert.equal(res.body.created_by, "fCC");
                assert.equal(res.body.status_text, "Not Done");
                assert.equal(res.body.issue_text, "Functional Test");
                done();
              });
          });
        })

        test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .post("/api/issues/projects")
              .set("content-type", "application/json")
              .send({
                issue_title: "Issue",
                issue_text: "Functional Test",
                created_by: "fCC",
                assigned_to: "",
                status_text: "",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, "Issue");
                assert.equal(res.body.created_by, "fCC");
                assert.equal(res.body.issue_text, "Functional Test");
                assert.equal(res.body.assigned_to, "");
                assert.equal(res.body.status_text, "");
                done();
              });
          });

          test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .post("/api/issues/projects")
              .set("content-type", "application/json")
              .send({
                issue_title: "",
                issue_text: "",
                created_by: "fCC",
                assigned_to: "",
                status_text: "",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "required field(s) missing");
                done();
              });
          });

        })
        suite('GET tests', () => {
          test("View issues on a project: GET request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .get("/api/issues/projects")
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isAtLeast(res.body.length, 1);
                done();
              });
          });

          test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
            chai
            .request(server)
            .get('/api/issues/apitest?_id=63fd79b5e81ab019dcdf8bad')
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 1);
              done();
              });
          });

          test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .get("/api/issues/apitest")
              .query({
                issue_title: "hey",
                issue_text: "ho"
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.length, 1);
                done();
              });
          });
})

suite("PUT Tests", function () {
    test("Update one field on an issue: PUT request to /api/issues/test-data-put", function (done) {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .send({
          _id: "63fd79b5e81ab019dcdf8bad",
          issue_title: "still broken",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "63fd79b5e81ab019dcdf8bad");
          done();
        });
    });

    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "63fd79b5e81ab019dcdf8bad",
            issue_title: "fixing but broke",
            issue_text: "site is broken",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, "successfully updated");
            assert.equal(res.body._id, "63fd79b5e81ab019dcdf8bad");
            done();
          });
      });

      test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            issue_title: "newtitle",
            issue_text: "newtext",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "missing _id");
            done();
          });
      });

      test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "63fd79b5e81ab019dcdf8bad",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "no update field(s) sent");
            done();
          });
      });

      test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "5fe0c500e672341c1815a770",
            issue_title: "newtitle",
            issue_text: "newtext",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "could not update");
            done();
          });
      });

      suite("3 DELETE request Tests", function () {
        test("Delete an issue: DELETE request to /api/issues/projects", function (done) {
          chai
            .request(server)
            .delete("/api/issues/projects")
            .send({
              _id: deleteID,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.result, "successfully deleted");
              done();
            });
        });

        test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .delete("/api/issues/projects")
              .send({
                _id: "5fe0c500ec2f6f4c1815a770thisisinvalid",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "could not delete");
    
                done();
              });
          });

          test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
            chai
              .request(server)
              .delete("/api/issues/projects")
              .send({})
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing _id");
                done();
              });
          });
    });
});
   
//       Create an issue with every field: POST request to /api/issues/{apitest}✅
//       Create an issue with only required fields: POST request to /api/issues/{apitest}✅
//       Create an issue with missing required fields: POST request to /api/issues/{apitest}✅
//       View issues on a apitest: GET request to /api/issues/{apitest}✅
//       View issues on a apitest with one filter: GET request to /api/issues/{apitest}✅
//       View issues on a apitest with multiple filters: GET request to /api/issues/{apitest}✅
//       Update one field on an issue: PUT request to /api/issues/{apitest}✅
//       Update multiple fields on an issue: PUT request to /api/issues/{apitest}✅
//       Update an issue with missing _id: PUT request to /api/issues/{apitest}✅
//       Update an issue with no fields to update: PUT request to /api/issues/{apitest}✅
//       Update an issue with an invalid _id: PUT request to /api/issues/{apitest}✅
//       Delete an issue: DELETE request to /api/issues/{apitest}✅
//       Delete an issue with an invalid _id: DELETE request to /api/issues/{apitest}✅
//       Delete an issue with missing _id: DELETE request to /api/issues/{apitest}✅