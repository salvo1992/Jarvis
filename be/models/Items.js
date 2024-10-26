// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String, // ID univoco dell'oggetto
    required: true,
  },
  name: {
    type: String, // Nome dell'oggetto
    required: true,
  },
  category: {
    type: String, // Categoria dell'oggetto (es. frigo, dispensa)
    required: true,
  },
  description: {
    type: String, // Descrizione dell'oggetto
    required: false,
  },
  expiryDate: {
    type: Date, // Data di scadenza (se applicabile)
    required: false,
  },
  pubDate: {
    type: Date, // Data di pubblicazione dell'oggetto
    required: false,
  },
}, { timestamps: true, strict: true });

module.exports = mongoose.model('Item', itemSchema, 'items');
