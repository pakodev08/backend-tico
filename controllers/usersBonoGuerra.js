import {UserGuerra} from "../mongoDB/Schemas/usersGuerra.js"
import {NumberBonoGuerra} from "../mongoDB/Schemas/generator-numbers-dos.js"


const createUserGuerra = async (req, res) => {
  try {
    const { name, cedula, tlf, ref, numbers } = req.body;

    // Buscar si ya existe un usuario con esa cédula
    let existingUser = await UserGuerra.findOne({ cedula });

    if (existingUser) {
      // Si el usuario ya existe, solo agregamos los números y referencia
      existingUser.numbers.push(...numbers); // Usar spread operator para agregar todos los números
      existingUser.ref.push(ref);
      await existingUser.save();

      // Eliminar los números de la colección Number
      if (numbers && numbers.length > 0) {
        const toDelete = numbers.map((numberId) => numberId.id);
        await NumberBonoGuerra.deleteMany({
          id: { $in: toDelete },
        });
      }

      return res.json({
        message: "Números agregados al usuario existente",
        user: {
          name: existingUser.name,
          cedula: existingUser.cedula,
          tlf: existingUser.tlf,
          ref: existingUser.ref,
          numbers: existingUser.numbers,
        },
      });
    }
    // Si no existe, crear un nuevo usuario
    const newUser = new UserGuerra({
      name,
      cedula,
      tlf,
      ref: [ref], // Asegurarse de que ref sea un array
      numbers,
    });

    await newUser.save();

    // Eliminar los números de la colección Number
    if (numbers && numbers.length > 0) {
      const toDelete = numbers.map((numberId) => numberId.id);
      await NumberBonoGuerra.deleteMany({
        id: { $in: toDelete },
      });
    }

    res.json({
      message: "Usuario creado exitosamente",
      user: {
        name,
        cedula,
        tlf,
        ref: [ref],
        numbers,
      },
    });
  } catch (error) {
    console.error("Error al crear/actualizar usuario:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { numbers } = req.body;
  try {
    await NumberBonoGuerra.insertMany(numbers);
    console.log(`Se agregaron ${numbers.length} números a la lista`);
    const user = await UserGuerra.findByIdAndDelete(id);

    res.json({
      message: "Usuario eliminado",
      user: user.numbers,
    });
  } catch (error) {
    console.log(error);
  }
};
const callAllUsers = async (req, res) => {
  try {
    const user = await UserGuerra.find();
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export { createUserGuerra, deleteUser, callAllUsers };