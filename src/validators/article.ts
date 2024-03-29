export const articleValidationOptions = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content"],
      properties: {
        title: {
          bsonType: "string",
          description: "El título es obligatorio",
        },
        content: {
          bsonType: "string",
          description: "El contenido es obligatorio",
        },
        imgURL: {
          bsonType: "string",
          description: "La imagen tiene que ser un URL",
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
