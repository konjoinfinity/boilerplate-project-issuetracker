const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  

    // suite("GET request at /api/convert to convert with no number", () => {
    //     test("[No number]kg Conversion to Gallons (Valid)",(done) => {
    //       chai
    //         .request(server)
    //         .get("/api/convert")
    //         .query({ input: "kg" })
    //         .end((err, res) => {
    //           assert.equal(res.status, 200);
    //           assert.equal(res.body.initNum, 1);
    //           assert.equal(res.body.initUnit, "kg");
    //           assert.equal(res.body.returnNum, 2.20462, 0.1);
    //           assert.equal(res.body.returnUnit, "lbs");
    //           done();
    //         });
    //       })
    //   })


    



});
