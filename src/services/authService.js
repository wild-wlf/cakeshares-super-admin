import { Fetch } from '../helpers/fetchWrapper';

const adminService = {
  _url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/admin/v1`,

  async login({ email = '', password = '' }) {
    let res = await Fetch.post(`${this._url}/login`, { email, password });
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async getCurrentAdmin() {
    let res = await Fetch.get(`${this._url}/perms`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async logout() {
    let res = await Fetch.delete(`${this._url}/logout`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default adminService;
