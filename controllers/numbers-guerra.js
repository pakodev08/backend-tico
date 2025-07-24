import crypto from 'crypto';
import { NumberBonoGuerra } from '../mongoDB/Schemas/generator-numbers-dos.js'

const guerraNumbersGenerate = async (req, res) =>
{
  try {


    const existingNumbers = await NumberBonoGuerra.find().sort({ number: 1 });

    if (existingNumbers.length > 0) {
      return res.json({
        message: `Los números ya han sido generados previamente`,
        numbers: existingNumbers,
      });
    }
    let numberToGenerate = 999
    let numbersDB = []
    for (let i = 0; i <= numberToGenerate; i++) {
      let numberInfo = {
        id: crypto.randomUUID(),
        number: String(i).padStart(3, "0"),
      }

      numbersDB.push(numberInfo)
    }

    await NumberBonoGuerra.insertMany(numbersDB)

    res.json({
      message: `Números generados e insertados correctamente`,
      numbersDB

    })

  } catch (error) {
    console.error(`Error al generar números:`, error);
    res.status(500).json({
      message: `Error al generar números`,
      error: error.message
    });
  }

}
export
{
  guerraNumbersGenerate
};

