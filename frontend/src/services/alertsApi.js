const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function fetchAlerts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.country) params.append('country', filters.country);
  if (filters.status) params.append('status', filters.status);

  const res = await fetch(`${API_BASE}/alerts?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch alerts');

  return res.json();
}

export async function createAlert(data) {
  const res = await fetch(`${API_BASE}/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create alert');
  }
}

export async function updateAlertStatus(id, status) {
  const res = await fetch(`${API_BASE}/alerts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('Failed to update alert');
}

export async function deleteAlert(id) {
  const res = await fetch(`${API_BASE}/alerts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete alert');
}
