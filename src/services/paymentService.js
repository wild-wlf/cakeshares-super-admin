import { useState, useEffect } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';
import { Fetch } from '../helpers/fetchWrapper';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const paymentService = {
  _url: `${process.env.NEXT_PUBLIC_PAYMENT_URL}`,

  GetAllPayouts(searchQuery, fetch) {
    const [payouts, setPayouts] = useState({
      payouts: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [payoutStatus, setPayoutStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setPayoutStatus(STATUS.LOADING);
      cancellablePromise(this.getAllPayouts(searchQuery))
        .then(res => {
          setPayouts(() => res);
          setPayoutStatus(STATUS.SUCCESS);
        })
        .catch(() => setPayoutStatus(STATUS.ERROR));
    }, [searchQuery, fetch]);
    return {
      payout_loading: payoutStatus === STATUS.LOADING,
      payout_error: payoutStatus === STATUS.ERROR,
      payout_data: payouts,
    };
  },

  async getAllPayouts({ page = 1, itemsPerPage = 10, searchText = '', getAll = false, status = '' }) {
    let res = await Fetch.get(
      `${this._url}/get-all-payouts?page=${page}&itemsPerPage=${itemsPerPage}&searchText=${searchText}&getAll=${getAll}&status=${status}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async handlePayoutRequest(payoutId, payload) {
    let res = await Fetch.patch(`${this._url}/handle-payout-request/${payoutId}`, payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default paymentService;
