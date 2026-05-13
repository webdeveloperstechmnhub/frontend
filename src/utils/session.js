export const SESSION_KEYS = {
  instituteToken: 'instituteToken',
  studentToken: 'studentToken',
};

const decodeJwtPayload = (token) => {
  try {
    const parts = String(token || '').split('.');
    if (parts.length !== 3) return null;

    const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const isJwtExpired = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return false;
  return Date.now() >= payload.exp * 1000;
};

export const hasInstituteSession = () => {
  const token = localStorage.getItem(SESSION_KEYS.instituteToken);
  if (!token) return false;

  if (isJwtExpired(token)) {
    clearInstituteSession();
    return false;
  }

  return true;
};

export const hasStudentSession = () => {
  const token = localStorage.getItem(SESSION_KEYS.studentToken);
  if (!token) return false;

  if (isJwtExpired(token)) {
    clearStudentSession();
    return false;
  }

  return true;
};

export const clearStudentSession = () => {
  localStorage.removeItem(SESSION_KEYS.studentToken);
  localStorage.removeItem('studentProfile');
};

export const clearInstituteSession = () => {
  localStorage.removeItem(SESSION_KEYS.instituteToken);
  localStorage.removeItem('instituteAccount');
  localStorage.removeItem('instituteProfile');
};

export const clearAllSessions = () => {
  clearStudentSession();
  clearInstituteSession();
};
