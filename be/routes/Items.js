const express = require('express');
const router = express.Router();
const Item = require('../models/Items'); // Assicurati di importare il modello

router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Assicurati che il modello Item sia definito correttamente
    res.json(items);
  } catch (error) {
    console.error('Errore nel recupero degli oggetti:', error);
    res.status(500).json({ message: "Errore nel recupero dell'oggetto" });
  }
});

// GET item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Oggetto non trovato' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dell\'oggetto' });
  }
});
// POST create a new item
router.post('/Items/create', async (req, res) => {
  const { itemId, name, category, description, expiryDate, pubDate } = req.body;
  
  // Logga i dati ricevuti
  console.log('Dati ricevuti:', req.body);

  const newItem = new Item({
    itemId,
    name,
    category,
    description,
    expiryDate,
    pubDate,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Errore nella creazione dell\'oggetto:', error); // Aggiungi un log dell'errore
    res.status(400).json({ 
      message: 'Errore nella creazione dell\'oggetto',
      error: error.message, // Includi il messaggio di errore
    });
  }
});

// DELETE item by ID
router.delete('/:id', async (req, res) => {
  console.log(`Richiesta di eliminazione ricevuta per ID: ${req.params.id}`); // Aggiungi questo log
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Oggetto non trovato' });
    }
    res.json({ message: 'Oggetto eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione:', error); // Log dell'errore
    res.status(500).json({ message: 'Errore nell\'eliminazione dell\'oggetto' });
  }
});


// PUT update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Oggetto non trovato' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento dell\'oggetto' });
  }
});

module.exports = router;