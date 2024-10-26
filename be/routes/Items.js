// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Items'); // Assicurati di importare il modello

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Trova tutti gli oggetti
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero degli oggetti' });
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
    res.status(400).json({ message: 'Errore nella creazione dell\'oggetto' });
  }
});

// DELETE item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Oggetto non trovato' });
    }
    res.json({ message: 'Oggetto eliminato con successo' });
  } catch (error) {
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
