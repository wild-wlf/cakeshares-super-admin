import { useState, useEffect } from 'react';
import { useCancellablePromise } from '../helpers/promiseHandler';
import { Fetch } from '../helpers/fetchWrapper';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const productService = {
  _url: `${process.env.NEXT_PUBLIC_PRODUCT_URL}`,

  GetAllProducts(searchQuery, fetch) {
    const [products, setProducts] = useState({
      products: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [productStatus, setProductStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setProductStatus(STATUS.LOADING);
      cancellablePromise(this.getAllProducts(searchQuery))
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

  async getDashboardCards() {
    let res = await Fetch.get(`${this._url}/get-dashboard-cards`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async getAllProducts({
    page = 1,
    itemsPerPage = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    status = '',
    accType = '',
    section = '',
  }) {
    let res = await Fetch.get(
      `${this._url}/get-all-products-super?page=${page}&itemsPerPage=${itemsPerPage}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&status=${status}&accType=${accType}&section=${section}`,
    );
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  GetAllInvestments(searchQuery, fetch) {
    const [investments, setInvestments] = useState({
      investments: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [investmentStatus, setInvestmentStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setInvestmentStatus(STATUS.LOADING);
      cancellablePromise(this.getAllInvestments(searchQuery))
        .then(res => {
          setInvestments(() => res);
          setInvestmentStatus(STATUS.SUCCESS);
        })
        .catch(() => setInvestmentStatus(STATUS.ERROR));
    }, [searchQuery, fetch]);
    return {
      investments_loading: investmentStatus === STATUS.LOADING,
      investments_error: investmentStatus === STATUS.ERROR,
      investments_data: investments,
    };
  },

  async getAllInvestments({ page = 1, itemsPerPage = 10, searchText = '', startDate = '', endDate = '' }) {
    let res = await Fetch.get(
      `${this._url}/get-all-investments-super?page=${page}&itemsPerPage=${itemsPerPage}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}`,
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

  async createProduct(payload) {
    let res = await Fetch.upload(`${this._url}/create-product`, 'POST', payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },

  async productDetails(id) {
    let res = await Fetch.get(`${this._url}/product-details/${id}`);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res?.data;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
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

  async manageProductEdit(id, payload) {
    let res = await Fetch.patch(`${this._url}/manage-product-edit/${id}`, payload);
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

  async rejectProduct(id, payload) {
    let res = await Fetch.put(`${this._url}/reject-product/${id}`,payload);
    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      return res;
    }
    const { message } = await res.json();
    throw new Error(message ?? 'Something Went Wrong');
  },
};

export default productService;
