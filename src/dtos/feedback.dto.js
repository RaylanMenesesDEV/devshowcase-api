export function validateFeedback(data) {
  const errors = [];

  if (!data.author || typeof data.author !== "string") {
    errors.push("O autor é obrigatório e deve ser um texto.");
  }

  if (data.author && data.author.trim().length < 3) {
    errors.push("O autor deve ter pelo menos 3 caracteres.");
  }

  if (!data.comment || typeof data.comment !== "string") {
    errors.push("O comentário é obrigatório e deve ser um texto.");
  }

  if (data.comment && data.comment.trim().length < 5) {
    errors.push("O comentário deve ter pelo menos 5 caracteres.");
  }

  if (!data.projectId || !Number.isInteger(Number(data.projectId))) {
    errors.push("O projectId é obrigatório e deve ser um número inteiro.");
  }

  return errors;
}