const connection = require('../data/db')

//index
function index(req, res, next) {
  const sql = `
    SELECT 
      medici.*, 
      COALESCE(AVG(paziente_medico.valutazione), 0) AS valutazione  
    FROM 
      db_docs.medici
    LEFT JOIN 
      db_docs.paziente_medico
    ON 
      medici.id_medico = paziente_medico.id_medico
    GROUP BY 
      medici.id_medico;
`

  connection.query(sql, (err, results) => {
    if (err) return next(err)
    res.json(results)
  })
}

//show
function show(req, res, next) {
  const { id } = req.params
  const sql = `
  SELECT 
    medici.*, paziente_medico.descrizione, paziente_medico.Valutazione         
  FROM 
    db_docs.medici     
  LEFT JOIN 
    paziente_medico ON medici.ID_medico = paziente_medico.ID_medico        
  WHERE 
    medici.ID_medico = ?
  `

  connection.query(sql, [id], (err, results) => {
    if (err) return next(err)
    if (results.length === 0) {
      return next()
    }
    const doctor = results[0]

    const sql = `
    SELECT * 
    FROM 
      paziente_medico 
    WHERE 
      id_medico = ?
    `

    connection.query(sql, [id], (err, results) => {
      if (err) return next(err)

      doctor.paziente_medico = results
      res.json(doctor)
    })
  })
}

//Funzione per aggiungere recnsioni
function storeReview(req, res, next) {
  const { name, Valutazione, Descrizione, } = req.body;
  const { id } = req.params; // Ottieni ID_medico dall'URL

  //Validazione dei dati in ingresso
  if (!name || typeof (name) !== 'string' || isNaN(Valutazione) || !Valutazione || Valutazione < 0 || Valutazione > 5 || !Descrizione) {
    return res.status(400).json({ message: 'Dati incompleti. Assicurati di includere name, valutazione, descrizione' });
  }

  // SQL per inserire la recensione
  const sql = `
  INSERT INTO 
    db_docs.paziente_medico(ID_medico, name, Valutazione, Descrizione) 
  VALUES 
    (?,?,?,?)
  `

  // Esecuzione della query
  connection.query(sql, [id, name, Valutazione, Descrizione], (err, results) => {
    if (err) {
      console.error(err); // Log dell'errore per il debugging
      return next(err); // Passa l'errore al middleware di gestione degli errori
    }

    res.status(201).json({ message: 'Recensione aggiunta', id: results.insertId });
  });
}

//funzion eper aggiungere dottore
function storeDoctor(req, res, next) {
  const { Email, Nome, Cognome, Telefono, Indirizzo, Specializzazione } = req.body;

  if (!Email || !Nome || !Cognome || !Telefono || isNaN(Telefono) || !Indirizzo || !Specializzazione) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  const sql = `
  INSERT INTO 
    db_docs.medici (Email, Nome, Cognome, Telefono, Indirizzo, Specializzazione) 
  VALUES (?, ?, ?, ?, ?, ?)
  `

  connection.query(sql, [Email, Nome, Cognome, Telefono, Indirizzo, Specializzazione], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      return next(err);
    }
    res.status(201).json({ message: 'Dottore registrato', id: results.insertId });
  });
}


// Funzione di ricerca per Nome, Cognome o Specializzazione
function search(req, res) {
  const { Nome, Cognome, Specializzazione } = req.query;
  let sql = `
  SELECT 
    medici.*, 
    COALESCE(AVG(paziente_medico.valutazione), 0) AS valutazione
  FROM 
    db_docs.medici 
  LEFT JOIN 
    db_docs.paziente_medico 
  ON 
    medici.id_medico = paziente_medico.id_medico
  WHERE 
    1=1`; // La condizione 1=1 permette di aggiungere filtri dinamicamente
  let params = [];

  if (Nome) {
    sql += ` AND Nome LIKE ?`;
    params.push(`%${Nome.trim()}%`);
  }

  if (Cognome) {
    sql += ` AND Cognome LIKE ?`;
    params.push(`%${Cognome.trim()}%`);
  }

  if (Specializzazione) {
    sql += ` AND Specializzazione LIKE ?`;
    params.push(`%${Specializzazione.trim()}%`);
  }

  sql += ` GROUP BY medici.id_medico`

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Errore nel recupero dati" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Nessun medico trovato" });
    }

    res.json(results);
  });
}

module.exports = { index, show, storeReview, storeDoctor, search }