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

  if (data.githubUrl && typeof data.githubUrl === "string") {
    try {
      new URL(data.githubUrl);
    } catch {
      errors.push("A URL do GitHub deve ser válida.");
    }
  }

  if (data.linkedinUrl && typeof data.linkedinUrl === "string") {
    try {
      new URL(data.linkedinUrl);
    } catch {
      errors.push("A URL do LinkedIn deve ser válida.");
    }
  }

  return errors;
}
export function profileResponseDTO(profile) {
  return {
    id: profile.id,
    name: profile.name,
    bio: profile.bio,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}