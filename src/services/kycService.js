import { Fetch } from '../helpers/fetchWrapper';

const kycService = {
  _url: `${process.env.NEXT_PUBLIC_USER_URL}`,

  async approveKyc(id) {
    let res = await Fetch.post(`${this._url}/approve-kyc/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async declineKyc(id, payload) {
    let res = await Fetch.post(`${this._url}/decline-kyc/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },

  async getKycInfo(id) {
    let res = await Fetch.get(`${this._url}/get-kyc-info/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default kycService;
