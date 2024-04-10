const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const app = express()
const PORT = 1337

app.use(cors())

app.use(express.json())

const db = new sqlite3.Database('./src/identifier.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message)
  console.log('Verbunden mit der SQLite-Datenbank.')
})

app.get('/items', (req, res) => {
  const sql = 'select * from items join categories cat on cat.category_id = items.fk_category join collections col on col.collection_id = items.fk_collection ORDER BY col.collection_id, item_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/categories', (req, res) => {
  const sql = 'select * from categories ORDER BY category_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/collections', (req, res) => {
  const sql = 'select * from collections ORDER BY collection_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
