const connection = require('../data/db')

//index
function index(req, res, next) {
  const sql = `SELECT 
    medici.*, AVG(paziente_medico.valutazione) AS valutazione
FROM 
    db_docs.medici
JOIN 
    db_docs.paziente_medico
ON 
    medici.id_medico = paziente_medico.id_medico
GROUP BY medici.id_medico
`

  connection.query(sql, (err, results) => {
    if (err) return next(err)
    res.json(results)
  })

}

//show
function show(req, res, next) {
  const { id } = req.params
  const sql = `SELECT medici.*, paziente_medico.descrizione, paziente_medico.Valutazione
              FROM db_docs.medici
              JOIN paziente_medico ON medici.ID_medico = paziente_medico.ID_medico`

  connection.query(sql, [id], (err, results) => {
    if (err) return next(err)
    if (results.length === 0) {
      return next()
    }
    const doctor = results[0]

    const sql = `SELECT * FROM paziente_medico WHERE id_medico = ?`

    connection.query(sql, [id], (err, results) => {
      if (err) return next(err)

      doctor.paziente_medico = results
      res.json(doctor)
    })

  })
}

function storeReview(req, res, next) {
  const { name, Valutazione, Descrizione, } = req.body;
  const { id } = req.params; // Ottieni ID_medico dall'URL

  //Validazione dei dati in ingresso
  if (!name || typeof (name) !== 'string' || isNaN(Valutazione) || !Valutazione || Valutazione < 0 || Valutazione > 6 || !Descrizione) {
    return res.status(400).json({ message: 'Dati incompleti. Assicurati di includere name, valutazione, descrizione' });
  }

  // SQL per inserire la recensione
  const sql = `INSERT INTO db_docs.paziente_medico(ID_medico, name, Valutazione, Descrizione) VALUES (?,?,?,?);`;

  // Esecuzione della query
  connection.query(sql, [id, name, Valutazione, Descrizione], (err, results) => {
    if (err) {
      console.error(err); // Log dell'errore per il debugging
      return next(err); // Passa l'errore al middleware di gestione degli errori
    }

    res.status(201).json({ message: 'Recensione aggiunta', id: results.insertId });
  });
}



module.exports = { index, show, storeReview }