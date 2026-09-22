export function validateTechnology(data) {
  const errors = [];

  if (!data.name || typeof data.name !== "string") {
    errors.push("O nome da tecnologia é obrigatório e deve ser um texto.");
  }

  if (data.name && data.name.trim().length < 2) {
    errors.push("O nome da tecnologia deve ter pelo menos 2 caracteres.");
  }

  return errors;
}
export function technologyResponseDTO(technology) {
  return {
    id: technology.id,
    name: technology.name,
    createdAt: technology.createdAt,
  };
}