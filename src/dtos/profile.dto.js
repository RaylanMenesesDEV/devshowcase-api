export function validateProfile(data) {
  const errors = [];

  if (!data.name || typeof data.name !== "string") {
    errors.push("O nome é obrigatório e deve ser um texto.");
  }

  if (data.name && data.name.trim().length < 3) {
    errors.push("O nome deve ter pelo menos 3 caracteres.");
  }

  if (data.bio && typeof data.bio !== "string") {
    errors.push("A bio deve ser um texto.");
  }

  if (data.githubUrl && typeof data.githubUrl !== "string") {
    errors.push("A URL do GitHub deve ser um texto.");
  }

  if (data.linkedinUrl && typeof data.linkedinUrl !== "string") {
    errors.push("A URL do LinkedIn deve ser um texto.");
  }

  return errors;
}