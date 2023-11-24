const { Schema, model } = require("mongoose");


const PizzaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    ingredientes: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    familiar: {
      type: Number,
      required: true,
    },
    mediana: {
      type: Number,
      required: true,
    },
    pequena: {
      type: Number,
      required: true,
    },
    porcion: {
      type: Number,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Pizzas", PizzaSchema);
