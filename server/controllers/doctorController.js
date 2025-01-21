const connection = require('../data/db')

function index(req, res, next) {
  const sql = `SELECT * FROM db_docs.medici`

  connection.query(sql, (err, results) => {
    if (err) return next(err)
    res.json(results)
  })

}

function show(req, res, next) {
  const { id } = req.params
  const sql = `SELECT * FROM db_docs.medici WHERE id_medico = ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return next(err)
    if (results.length === 0) {
      return next()
    }
    res.json(results[0])
  })

}

module.exports = { index, show }