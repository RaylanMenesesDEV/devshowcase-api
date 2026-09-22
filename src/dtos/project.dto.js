export function validateProject(data) {
  const errors = [];

  if (!data.title || typeof data.title !== "string") {
    errors.push("O título é obrigatório e deve ser um texto.");
  }

  if (data.title && data.title.trim().length < 3) {
    errors.push("O título deve ter pelo menos 3 caracteres.");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("A descrição é obrigatória e deve ser um texto.");
  }

  if (data.description && data.description.trim().length < 10) {
    errors.push("A descrição deve ter pelo menos 10 caracteres.");
  }

  if (data.projectUrl && typeof data.projectUrl !== "string") {
    errors.push("A URL do projeto deve ser um texto.");
  }

  if (data.imageUrl && typeof data.imageUrl !== "string") {
    errors.push("A URL da imagem deve ser um texto.");
  }

  if (!data.profileId || !Number.isInteger(Number(data.profileId))) {
    errors.push("O profileId é obrigatório e deve ser um número inteiro.");
  }

  return errors;
}