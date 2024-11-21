import { api } from "./config/axiosConfig";

export const generalAPI = {

  getAnnoucements: async function () {

      const response = await api.request({
        url: `/general/announcements`,
        method: "GET",
      })
      
      // returning the product returned by the API
      return response.data;
  },

  getTrendingBusinesses: async function (id) {

    const response = await api.request({
      url: `/general/trendingBusinesses`,
      method: "GET",
    })
    
    // returning the product returned by the API
    return response.data;
  },

  getDownTrendingBusinesses: async function (id, email, amount, paymentId, status) {

    const response = await api.request({
      url: `/general/downtrendingBusinesses`,
      method: "GET",
    })
    
    // returning the product returned by the API
    return response.data;
  },

  getLocalCompanies: async function (latitude, longitude) {

    const response = await api.request({
      url: `/general/localBusinesses`,
      method: "GET",
      params: {
        latitude: latitude,
        longitude: longitude
      }
    })
    
    // returning the product returned by the API
    return response.data;
  },

  getPublicCompany: async function (id) {

    const response = await api.request({
      url: `/general/getStock`,
      method: "GET",
      params: {
        businessId: id
      }
    })
    
    // returning the product returned by the API
    return response.data;
  }
};