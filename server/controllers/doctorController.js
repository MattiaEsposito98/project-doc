const connection = require('../data/db')


//index
function index(req, res, next) {
  const sql = `SELECT * FROM db_docs.medici`

  connection.query(sql, (err, results) => {
    if (err) return next(err)
    res.json(results)
  })

}

//show
function show(req, res, next) {
  const { id } = req.params
  const sql = `SELECT * FROM db_docs.medici WHERE id_medico = ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return next(err)
    if (results.length === 0) {
      return next()
    }
    const doctor = results[0]
    res.json(doctor)
  })

}

//store
function storeReview(req, res, next) {
  const { ID_paziente, ID_medico, valutazione, descrizione } = req.body
  const sql = `INSERT INTO db_docs.paziente_medico(ID_paziente,ID_medico, Valutazione, Descrizione) VALUES (?,?, ?, ?);`

  connection.query(sql, [ID_paziente, ID_medico, valutazione, descrizione], (err, results) => {
    if (err) return next(err)
    res.status(201).json({ message: 'Recensione aggiunta', id: results.insertId })
  })


}

module.exports = { index, show, storeReview }