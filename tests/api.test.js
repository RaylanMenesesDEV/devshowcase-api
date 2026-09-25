import test from "node:test";
import assert from "node:assert";

import app from "../src/app.js";

test("GET / deve retornar a mensagem da API", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.message, "DevShowcase API funcionando!");
  } finally {
    server.close();
  }
});

test("GET /api/profiles deve retornar uma lista de perfis", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data));
  } finally {
    server.close();
  }
});

test("POST /api/profiles deve criar um novo perfil", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil de Teste",
          bio: "Perfil criado durante o teste automatizado",
          githubUrl: "https://github.com/teste",
          linkedinUrl: "https://linkedin.com/in/teste",
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(data.id);
    assert.strictEqual(data.name, "Perfil de Teste");
  } finally {
    server.close();
  }
});

test("GET /api/profiles/:id deve retornar um perfil específico", async () => {
  const server = app.listen(0);

  try {
    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil Individual",
          bio: "Perfil usado para testar busca por ID",
          githubUrl: "https://github.com/teste",
          linkedinUrl: "https://linkedin.com/in/teste",
        }),
      }
    );

    const createdProfile = await createResponse.json();

    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles/${createdProfile.id}`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdProfile.id);
    assert.strictEqual(data.name, "Perfil Individual");
  } finally {
    server.close();
  }
});

test("PUT /api/profiles/:id deve atualizar um perfil", async () => {
  const server = app.listen(0);

  try {
    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil Para Atualizar",
          bio: "Bio original do perfil",
        }),
      }
    );

    const createdProfile = await createResponse.json();

    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles/${createdProfile.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil Atualizado",
          bio: "Bio atualizada pelo teste",
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdProfile.id);
    assert.strictEqual(data.name, "Perfil Atualizado");
    assert.strictEqual(data.bio, "Bio atualizada pelo teste");
  } finally {
    server.close();
  }
});

test("DELETE /api/profiles/:id deve excluir um perfil", async () => {
  const server = app.listen(0);

  try {
    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil Para Excluir",
          bio: "Perfil criado para testar exclusão",
        }),
      }
    );

    const createdProfile = await createResponse.json();

    const deleteResponse = await fetch(
      `http://localhost:${server.address().port}/api/profiles/${createdProfile.id}`,
      {
        method: "DELETE",
      }
    );

    assert.strictEqual(deleteResponse.status, 204);

    const getResponse = await fetch(
      `http://localhost:${server.address().port}/api/profiles/${createdProfile.id}`
    );

    assert.strictEqual(getResponse.status, 404);
  } finally {
    server.close();
  }
});

test("GET /api/projects deve retornar uma lista de projetos", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data.projects));
    assert.strictEqual(typeof data.total, "number");
    assert.strictEqual(typeof data.page, "number");
    assert.strictEqual(typeof data.limit, "number");
    assert.strictEqual(typeof data.totalPages, "number");
  } finally {
    server.close();
  }
});

test("POST /api/projects deve criar um novo projeto", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Projeto de Teste",
          description: "Projeto criado durante o teste automatizado",
          projectUrl: "https://github.com/teste",
          imageUrl: "https://via.placeholder.com/600",
          profileId: 2,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(data.id);
    assert.strictEqual(data.title, "Projeto de Teste");
    assert.strictEqual(data.profileId, 2);
  } finally {
    server.close();
  }
});

test("GET /api/projects/:id deve retornar um projeto específico", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects/1`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, 1);
    assert.ok(data.title);
    assert.ok(data.description);
  } finally {
    server.close();
  }
});

test("PUT /api/projects/:id deve atualizar um projeto", async () => {
  const server = app.listen(0);

  try {
    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Projeto Para Atualizar",
          description: "Descrição original do projeto para teste",
          projectUrl: "https://github.com/teste",
          imageUrl: "https://via.placeholder.com/600",
          profileId: 2,
        }),
      }
    );

    const createdProject = await createResponse.json();

    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects/${createdProject.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Projeto Atualizado",
          description: "Descrição atualizada pelo teste automatizado",
          profileId: 2,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdProject.id);
    assert.strictEqual(data.title, "Projeto Atualizado");
    assert.strictEqual(
      data.description,
      "Descrição atualizada pelo teste automatizado"
    );
  } finally {
    server.close();
  }
});

test("DELETE /api/projects/:id deve excluir um projeto", async () => {
  const server = app.listen(0);

  try {
    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Projeto Para Excluir",
          description: "Projeto criado para testar a exclusão",
          profileId: 2,
        }),
      }
    );

    const createdProject = await createResponse.json();

    const deleteResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects/${createdProject.id}`,
      {
        method: "DELETE",
      }
    );

    assert.strictEqual(deleteResponse.status, 204);

    const getResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects/${createdProject.id}`
    );

    assert.strictEqual(getResponse.status, 404);
  } finally {
    server.close();
  }
});

test("GET /api/technologies deve retornar uma lista de tecnologias", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/technologies`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data));
  } finally {
    server.close();
  }
});

test("POST /api/technologies deve criar uma nova tecnologia", async () => {
  const server = app.listen(0);

  try {
    const technologyName = `Tecnologia Teste ${Date.now()}`;

    const response = await fetch(
      `http://localhost:${server.address().port}/api/technologies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: technologyName,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(data.id);
    assert.strictEqual(data.name, technologyName);
  } finally {
    server.close();
  }
});

test("GET /api/technologies/:id deve retornar uma tecnologia específica", async () => {
  const server = app.listen(0);

  try {
    const technologyName = `Tecnologia Individual ${Date.now()}`;

    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/technologies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: technologyName,
        }),
      }
    );

    const createdTechnology = await createResponse.json();

    assert.strictEqual(createResponse.status, 201);
    assert.ok(createdTechnology.id);

    const response = await fetch(
      `http://localhost:${server.address().port}/api/technologies/${createdTechnology.id}`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdTechnology.id);
    assert.strictEqual(data.name, technologyName);
  } finally {
    server.close();
  }
});

test("POST /api/project-technologies deve associar uma tecnologia a um projeto", async () => {
  const server = app.listen(0);

  try {
    const projectResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Projeto Teste ${Date.now()}`,
          description: "Projeto criado para testar a relação com tecnologia.",
          profileId: 2,
        }),
      }
    );

    const project = await projectResponse.json();

    assert.strictEqual(projectResponse.status, 201);
    assert.ok(project.id);

    const technologyResponse = await fetch(
      `http://localhost:${server.address().port}/api/technologies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Tecnologia Relacao ${Date.now()}`,
        }),
      }
    );

    const technology = await technologyResponse.json();

    assert.strictEqual(technologyResponse.status, 201);
    assert.ok(technology.id);

    const response = await fetch(
      `http://localhost:${server.address().port}/api/project-technologies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          technologyId: technology.id,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.projectId, project.id);
    assert.strictEqual(data.technologyId, technology.id);
  } finally {
    server.close();
  }
});

test("GET /api/project-technologies/project/:projectId deve retornar as tecnologias do projeto", async () => {
  const server = app.listen(0);

  try {
    const projectResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const projectsData = await projectResponse.json();

    assert.strictEqual(projectResponse.status, 200);
    assert.ok(Array.isArray(projectsData.projects));
    assert.ok(projectsData.projects.length > 0);

    const projectId = projectsData.projects[0].id;

    const response = await fetch(
      `http://localhost:${server.address().port}/api/project-technologies/project/${projectId}`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data));
  } finally {
    server.close();
  }
});

test("GET /api/feedbacks deve retornar uma lista de feedbacks", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data));
  } finally {
    server.close();
  }
});

test("GET /api/feedbacks/:id deve retornar um feedback específico", async () => {
  const server = app.listen(0);

  try {
    const projectsResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const projectsData = await projectsResponse.json();

    assert.strictEqual(projectsResponse.status, 200);
    assert.ok(Array.isArray(projectsData.projects));
    assert.ok(projectsData.projects.length > 0);

    const projectId = projectsData.projects[0].id;

    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: `Autor Individual ${Date.now()}`,
          comment: "Feedback individual criado para teste.",
          projectId,
        }),
      }
    );

    const createdFeedback = await createResponse.json();

    assert.strictEqual(createResponse.status, 201);
    assert.ok(createdFeedback.id);

    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks/${createdFeedback.id}`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdFeedback.id);
    assert.strictEqual(data.projectId, projectId);
  } finally {
    server.close();
  }
});

test("PUT /api/feedbacks/:id deve atualizar um feedback", async () => {
  const server = app.listen(0);

  try {
    const projectsResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const projectsData = await projectsResponse.json();

    assert.strictEqual(projectsResponse.status, 200);
    assert.ok(Array.isArray(projectsData.projects));
    assert.ok(projectsData.projects.length > 0);

    const projectId = projectsData.projects[0].id;

    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: `Autor Atualizacao ${Date.now()}`,
          comment: "Feedback criado para testar atualização.",
          projectId,
        }),
      }
    );

    const createdFeedback = await createResponse.json();

    assert.strictEqual(createResponse.status, 201);
    assert.ok(createdFeedback.id);

    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks/${createdFeedback.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Autor Atualizado",
          comment: "Feedback atualizado com sucesso.",
          projectId,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.id, createdFeedback.id);
    assert.strictEqual(data.author, "Autor Atualizado");
    assert.strictEqual(data.comment, "Feedback atualizado com sucesso.");
  } finally {
    server.close();
  }
});

test("DELETE /api/feedbacks/:id deve excluir um feedback", async () => {
  const server = app.listen(0);

  try {
    const projectsResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const projectsData = await projectsResponse.json();

    assert.strictEqual(projectsResponse.status, 200);
    assert.ok(Array.isArray(projectsData.projects));
    assert.ok(projectsData.projects.length > 0);

    const projectId = projectsData.projects[0].id;

    const createResponse = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: `Autor Exclusao ${Date.now()}`,
          comment: "Feedback criado para testar exclusão.",
          projectId,
        }),
      }
    );

    const createdFeedback = await createResponse.json();

    assert.strictEqual(createResponse.status, 201);
    assert.ok(createdFeedback.id);

    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks/${createdFeedback.id}`,
      {
        method: "DELETE",
      }
    );

    assert.strictEqual(response.status, 204);
  } finally {
    server.close();
  }
});

test("POST /api/profiles deve rejeitar perfil sem nome", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: "Perfil sem nome",
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.errors);
  } finally {
    server.close();
  }
});

test("POST /api/projects deve rejeitar projeto sem título", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Projeto sem título para teste.",
          profileId: 2,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.errors);
  } finally {
    server.close();
  }
});

test("POST /api/technologies deve rejeitar tecnologia sem nome", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/technologies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.errors);
  } finally {
    server.close();
  }
});

test("POST /api/feedbacks deve rejeitar comentário muito curto", async () => {
  const server = app.listen(0);

  try {
    const projectsResponse = await fetch(
      `http://localhost:${server.address().port}/api/projects`
    );

    const projectsData = await projectsResponse.json();

    assert.strictEqual(projectsResponse.status, 200);
    assert.ok(Array.isArray(projectsData.projects));
    assert.ok(projectsData.projects.length > 0);

    const projectId = projectsData.projects[0].id;

    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Autor Teste",
          comment: "Oi",
          projectId,
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.errors);
  } finally {
    server.close();
  }
});

test("GET /api/profiles/:id deve retornar 404 para perfil inexistente", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles/999999`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 404);
    assert.ok(data.message);
  } finally {
    server.close();
  }
});

test("GET /api/projects/:id deve retornar 404 para projeto inexistente", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/projects/999999`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 404);
    assert.ok(data.message);
  } finally {
    server.close();
  }
});

test("GET /api/technologies/:id deve retornar 404 para tecnologia inexistente", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/technologies/999999`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 404);
    assert.ok(data.message);
  } finally {
    server.close();
  }
});

test("GET /api/feedbacks/:id deve retornar 404 para feedback inexistente", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/feedbacks/999999`
    );

    const data = await response.json();

    assert.strictEqual(response.status, 404);
    assert.ok(data.message);
  } finally {
    server.close();
  }
});

test("POST /api/profiles deve rejeitar URL inválida", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(
      `http://localhost:${server.address().port}/api/profiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Perfil URL Inválida",
          githubUrl: "abc",
        }),
      }
    );

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.errors);
  } finally {
    server.close();
  }
});