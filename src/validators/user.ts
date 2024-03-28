export const userValidationOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "password"],
      properties: {
        name: {
          bsonType: "string",
          description: "El nombre debe ser una cadena y es requerido",
        },
        password: {
          bsonType: "string",
          description: "La contraseña es obligatoria",
        },
        active: {
          bsonType: "bool",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "warn",
};
