const resolveApiBases = () => {
  const direct = String(import.meta.env.VITE_API_URL || '').trim();
  const backend = String(import.meta.env.VITE_BACKEND_URL || '').trim();

  const candidates = [
    direct,
    backend,
    'http://localhost:5001/api',
    'http://localhost:5000/api',
  ]
    .map((url) => String(url || '').trim().replace(/\/$/, ''))
    .filter(Boolean);

  return [...new Set(candidates)];
};

const readJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const DEFAULT_TIMEOUT = 12000;

const shouldRetryHttpStatus = (status) => status >= 500 || status === 429 || status === 408;

export const apiRequest = async (path, options = {}) => {
  const bases = resolveApiBases();
  let lastError = 'Request failed.';
  let lastStatus = null;

  for (const base of bases) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs || DEFAULT_TIMEOUT);

    try {
      const response = await fetch(`${base}${path}`, {
        ...options,
        signal: controller.signal,
      });
      const data = await readJsonSafely(response);
      lastStatus = response.status;

      if (!response.ok) {
        lastError = data.msg || `Request failed (${response.status}).`;

        // For most 4xx responses, retrying another base only duplicates user errors.
        if (!shouldRetryHttpStatus(response.status)) {
          clearTimeout(timer);
          return { ok: false, msg: lastError, status: response.status, data };
        }

        continue;
      }

      clearTimeout(timer);
      return { ok: true, data, base };
    } catch (error) {
      if (error?.name === 'AbortError') {
        lastError = 'Request timed out. Please try again.';
      } else {
        lastError = 'Unable to connect to backend service.';
      }
    } finally {
      clearTimeout(timer);
    }
  }

  return { ok: false, msg: lastError, status: lastStatus };
};

export const buildAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});
