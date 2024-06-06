import { Fetch } from '@/helpers/fetchWrapper';

const AdminService = {
  _url: `${process.env.NEXT_PUBLIC_ADMIN_URL}`,

  async UpdateAdmin(id, payload) {
    let res = await Fetch.customPatch(`${this._url}/update-admin/${id}`, payload);
    if (res.status >= 200 && res.status <= 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};
export default AdminService;