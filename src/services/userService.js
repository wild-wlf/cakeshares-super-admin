import { useState, useEffect } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';
import { Fetch } from '../helpers/fetchWrapper';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const userService = {
  _url: `${process.env.NEXT_PUBLIC_USER_URL}/user`,

  GetAllUsers(searchQuery, fetch) {
    const [users, setUsers] = useState({
      users: [],
    });
    const { cancellablePromise } = useCancellablePromise();
    const [userStatus, setUserStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setUserStatus(STATUS.LOADING);
      cancellablePromise(this.getAllUsers(searchQuery))
        .then(res => {
          setUsers(() => res);
          setUserStatus(STATUS.SUCCESS);
        })
        .catch(() => setUserStatus(STATUS.ERROR));
    }, [searchQuery, fetch]);
    return {
      user_loading: userStatus === STATUS.LOADING,
      user_error: userStatus === STATUS.ERROR,
      user_data: users,
    };
  },

  async getAllUsers({
    page = 1,
    itemsPerPage = 10,
    startDate = '',
    endDate = '',
    searchText = '',
    type = 'Buyer',
    kycLevel = '',
    status = '',
    accType = '',
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-users?page=${page}&itemsPerPage=${itemsPerPage}&startDate=${startDate}&endDate=${endDate}&searchText=${searchText}&type=${type}&kycLevel=${kycLevel}&status=${status}&accType=${accType}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async updateUser(userId, payload) {
    let res = await Fetch.upload(`${this._url}/update-user/${userId}`, 'PUT', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something went wrong');
  },
};

export default userService;
