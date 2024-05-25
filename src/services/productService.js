import { useState, useEffect } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';
import { Fetch } from '../helpers/fetchWrapper';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productService = {
  _url: `${process.env.NEXT_PUBLIC_USER_URL}/product`,

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

  GetAllProducts(searchQuery, fetch, id) {
    const [products, setProducts] = useState({
      products: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [productStatus, setProductStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setProductStatus(STATUS.LOADING);
      cancellablePromise(this.getAllProducts(searchQuery, id))
        .then(res => {
          setProducts(() => res);
          setProductStatus(STATUS.SUCCESS);
        })
        .catch(() => setProductStatus(STATUS.ERROR));
    }, [searchQuery, fetch]);
    return {
      products_loading: productStatus === STATUS.LOADING,
      products_error: productStatus === STATUS.ERROR,
      products_data: products,
    };
  },

  async getAllUsers({
    page = 1,
    itemsPerPage = 10,
    startDate = '',
    endDate = '',
    searchText = '',
    section = '',
    status = '',
    accType = '',
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-users?page=${page}&itemsPerPage=${itemsPerPage}&startDate=${startDate}&endDate=${endDate}&searchText=${searchText}&section=${section}&status=${status}&accType=${accType}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async getAllProducts({ page = 1, itemsPerPage = 10 }, id) {
    let res = await Fetch.get(`${this._url}/get-all-products/${id}?page=${page}&itemsPerPage=${itemsPerPage}`);
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

  async updateProduct(id, payload) {
    let res = await Fetch.upload(`${this._url}/update-product/${id}`, 'PUT', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async deleteProduct(id) {
    let res = await Fetch.delete(`${this._url}/delete-product/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },
};

export default productService;
