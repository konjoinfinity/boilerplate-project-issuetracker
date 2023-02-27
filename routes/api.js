'use strict';

module.exports = function (app) {

  // <form id="testForm" class="border">
  //       <input type="text" name="issue_title" placeholder="*Title" style="width: 100px" required=''><br>
  //       <textarea type="text" name="issue_text" placeholder="*Text" style="width: 100px" required=''></textarea><br>
  //       <input type="text" name="created_by" placeholder="*Created by" style="width: 100px" required=''><br>
  //       <input type="text" name="assigned_to" placeholder="(opt)Assigned to" style="width: 100px"><br>
  //       <input type="text" name="status_text" placeholder="(opt)Status text" style="width: 100px"><br></br>

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
      let title = req.query.issue_title;
      let text = req.query.issue_text;
      let author = req.query.created_by;
      let assigned = req.query.assigned_to;
      let status = req.query.status_text;
      // if (!initNum && !initUnit) {
      //   res.send("invalid number and unit");
      //   return;
      // } else if (!initNum) {
      //   res.send("invalid number");
      //   return;
      // } else if (!initUnit) {
      //   res.send("invalid unit");
      //   return;
      // }
      // let returnNum = convertHandler.convert(initNum, initUnit);
      // let returnUnit = convertHandler.getReturnUnit(initUnit);
      // let toString = convertHandler.getString(
      //   initNum,
      //   initUnit,
      //   returnNum,
      //   returnUnit
      // );
  
      // res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });


    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
