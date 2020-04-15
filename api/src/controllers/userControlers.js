var { User, team, EventResult } = require('../../models/index');
const cronTask = require('../db/update');
const superagent = require('superagent');
const ExcelJs = require('exceljs');

exports.allUsers = (req, res, next) => {
  User.findAll({
    include: [
      { model: team },
      { model: EventResult } ],
    order: [ [ 'her', 'DESC' ] ]
  })
    .then(
      (user) => {
        // console.log(user);
        // const updatedUsers = user.map(record => {
        //   console.log(record.dataValues);
        //   return {
        //     ...record,
        //     aggregated:  record.EventResults.length > 0 ? record.EventResults.reduce((acc,value)=> acc + value.result, 0) : 0
        //   };
        // });
        let userUpdate = JSON.stringify(user);
        // console.log(k);

        userUpdate = JSON.parse(userUpdate);
        userUpdate = userUpdate.map(record => {
          return {
            ...record,
            aggregated: record.EventResults.length > 0 ? record.EventResults.reduce((acc, value) => acc + value.result, 0) : 0
          };
        });
        // console.log(user);
        return res.json(userUpdate.sort((a, b) => (a.aggregated < b.aggregated) ? 1 : -1));
      }
    )
    .catch(next);
};

exports.createUser = async (req, res, next) => {
  var { firstName, lastName, userName, teamId, phoneNumber } = req.body;
  //Confirm that the userName actually exists and set the her
  var url = `https://lichess.org/@/${ userName }/perf/blitz`;
  let userData;
  try {
    let res = await superagent
      .get(url)
      .set('accept', 'application/vnd.lichess.v2+json');
    userData = JSON.parse(res.text);
  } catch (e) {
    console.log("error occured", e);
    res.status(400).json({ error: "UserName does not exist on Lichess" })
  }
  const her = userData.stat.highest.int;
  try {
    var result = await User.create({
      firstName,
      lastName,
      userName,
      teamId,
      her,
      phoneNumber
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Unable to create user at this time, username may already be registered" })
  }

};

exports.deleteUser = async (req, res, next) => {
  var userId = req.params.id;
  try {
    var response = await User.destroy({ where: { id: userId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }

};

exports.updatePayment = async (req, res, next) => {
  var userId = req.params.id;
  try {
    var userInstance = await User.findOne({ where: { id: userId } });
    userInstance.update({ paymentStatus: !userInstance.paymentStatus });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }
};
exports.updateHER = async (req, res, next) => {
  try {
    await cronTask.updateUser();
    // await cronTask.teamTallies();
    res.status(200).json({ success: 'Updated' });
  } catch (e) {
    res.status(500).json(e);
  }
}

exports.downloadExcel = async (req, res, next) => {
  const wk = new ExcelJs.Workbook({});
  const sheet = wk.addWorksheet('User', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });
  const userData = await User.findAll({
    include: [
      { model: team },
      { model: EventResult } ],
    order: [ [ 'her', 'DESC' ] ]
  });
  let userUpdate = JSON.stringify(userData);

  userUpdate = JSON.parse(userUpdate);
  let columns = [
      { header: 'First Name', key: 'firstName' },
      { header: 'Last Name', key: 'lastName' },
      { header: 'User Name', key: 'userName' },
      { header: 'H.E.R', key: 'her' },
      { header: 'Phone Number', key: 'phoneNumber' },
      { header: 'Payment Status', key: 'paymentStatus' },
      { header: 'Results', key: 'results' },
      { header: 'Team', key: 'team' }
  ];

  sheet.columns = columns;
  userUpdate = userUpdate.map(record => {
    return {
      ...record,
      aggregated: record.EventResults.length > 0 ? record.EventResults.reduce((acc, value) => acc + value.result, 0) : 0
    };
  });
  let rows = []
  userUpdate.map((value) => {
    rows.push({
      firstName: value.firstName,
      lastName: value.lastName,
      userName: value.userName,
      her: value.her,
      phoneNumber: value.phoneNumber,
      paymentStatus: value.paymentStatus ? 'Paid': 'Unpaid',
      results: value.aggregated,
      team: value.team.teamName
    });
  });
  sheet.addRows(rows);
  const buffer = await wk.xlsx.writeBuffer();
  res.writeHead(200, {
    'Content-Disposition': 'attachment; filename="user.xlsx"',
    'Transfer-Encoding': 'chunked',
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  res.end(buffer,'binary');
}
