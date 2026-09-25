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

  if (
  data.rating !== undefined &&
  (
    !Number.isInteger(Number(data.rating)) ||
    Number(data.rating) < 1 ||
    Number(data.rating) > 5
  )
) {
  errors.push("A nota deve ser um número inteiro entre 1 e 5.");
}

  return errors;
}
export function feedbackResponseDTO(feedback) {
  return {
    id: feedback.id,
    author: feedback.author,
    comment: feedback.comment,
    rating: feedback.rating,
    projectId: feedback.projectId,
    createdAt: feedback.createdAt,
  };
}