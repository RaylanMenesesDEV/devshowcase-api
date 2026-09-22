export function projectTechnologyResponseDTO(projectTechnology) {
  return {
    projectId: projectTechnology.projectId,
    technologyId: projectTechnology.technologyId,
  };
}