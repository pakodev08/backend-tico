import { NumberBonoGuerra } from "../mongoDB/Schemas/generator-numbers-dos.js";
import { toCloseRaffle , closedRaffleBack} from "../routes/closedRaffle.js";
const exposeNumbers = async (req, res) => {
  try {
    const numbers = await NumberBonoGuerra.find();
    res.json({
      numbers,
      closedRaffleBack,
      message: "Números expuestos",
    });
  } catch (error) {
    console.log(error);
  }
};

export { exposeNumbers };
