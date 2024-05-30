import { Fetch } from '../helpers/fetchWrapper';

const walletService = {
  _url: `${process.env.NEXT_PUBLIC_USER_URL}`,

  async addBalance(payload) {
    let res = await Fetch.post(`${this._url}/add-balance`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default walletService;
