import axios from 'axios';

const API_BASE = 'https://mastercard-hackathonhosted.onrender.com';


export type Role = 'donor' | 'receiver' | 'admin';


export const authApi = {
  async register(payload: { name: string; email: string; password: string; role: Role }) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Register failed');
    return res.json();
  },
  async login(payload: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    return res.json();
  },
  async me(token: string) {
    const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  }
};

export const tokenStore = {
  get() { return localStorage.getItem('auth_token'); },
  set(token: string) { localStorage.setItem('auth_token', token); },
  clear() { localStorage.removeItem('auth_token'); }
};

export const createDonation = async (formData: FormData, token: string) => {
  try {
    console.log("Token used for donation:", token);
    const response = await axios.post(
      'https://mastercard-hackathonhosted.onrender.com/api/donations',
      formData,
      {
        headers: {
          // The 'Content-Type' is automatically set to 'multipart/form-data' by axios when you pass a FormData object.
          'Authorization': `Bearer ${token}` // <-- This is the crucial part
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
};
