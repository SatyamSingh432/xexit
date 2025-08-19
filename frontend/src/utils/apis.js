const API_URL = "http://localhost:3001";

export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const resJson = await res.json();

  localStorage.setItem("token", resJson.token);

  return resJson;
};

export const registerUser = async (username, password) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    const resJson = await res.json();
    localStorage.setItem("token", resJson.token);
    return resJson;
  }
  return { error: true };
};

export const submitResignation = async (lwd, token) => {
  const res = await fetch(`${API_URL}/api/user/resign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ lwd }),
  });
  return res.json();
};

export const getResignationStatus = async (token) => {
  const res = await fetch(`${API_URL}/api/user/resignation_status`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return res.json();
};

export const submitQuestionnaire = async (responses, token) => {
  const res = await fetch(`${API_URL}/api/user/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ responses }),
  });
  return res.json();
};

export const verifyToken = async (token) => {
  const res = await fetch(`${API_URL}/api/auth/verify`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return res.json();
};

export const getResignations = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/resignations`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return res.json();
};

export const concludeResignation = async (
  resignationId,
  approved,
  lwd,
  token
) => {
  const res = await fetch(`${API_URL}/api/admin/conclude_resignation`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ resignationId, approved, lwd }),
  });
  return res.json();
};

export const getQuestionnaire = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/exit_responses`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return res.json();
};
