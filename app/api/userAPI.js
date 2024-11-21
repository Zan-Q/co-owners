import { api } from "./config/axiosConfig";

//Toast
import { toast as showToast, toast } from 'sonner'

export const userAPI = {

  checkExistingEmail: async function (email) {
    
    const response = await api.request({
      url: `/auth/checkExistingUser`,
      method: "POST",
      data: {
        email: email,
      },
    })

    // returning the product returned by the API
    return response.data
  },

  login: async function (email, password) {

    try {
      const response = await api.request({
        url: `/auth/login`,
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      })

      // returning the product returned by the API
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
    
        showToast.error("Login Failed", {
          description: 'Invalid email or password',
        })        
      }
    }
  },

  register: async function (username, name, email, password) {

    const response = await api.request({
      url: `/auth/register`,
      method: "POST",
      data: {
        username: username,
        name: name,
        email: email,
        password: password
      },
    })
    
    // returning the product returned by the API
    return response
  },

  signUpWithGoogle: async function (email, username, name, providerId, providerName, imageUrl) {

    const response = await api.request({
      url: `/auth/signUpWithGoogle`,
      method: "POST",
      data: {
        email,
        username,
        name,
        providerId,
        providerName,
        imageUrl
      },
    })

    // returning the product returned by the API
    return response
  },

  // Persistent Login - checking user token
  checklogintoken: async function (token) {

    try {
      const response = await api.request({
        url: `/auth/checklogintoken`,
        method: "POST",
        data: {
          token: token,
        },
      })
      
      // returning the product returned by the API
      return response.data;
    } catch (error) {
      
    }
  },

  // User Login - via Google
  checkGoogleLogin: async function (email) {

    const response = await api.request({
      url: `/auth/check-login`,
      method: "POST",
      data: {
        email: email,
      },
    })
    
    // returning the product returned by the API
    return response
  },

  //Send Email Verification
  sendEmailVerification: async function (email, code, codeURL) {

    const response = await api.request({
      url: `/users/sendVerificationEmail`,
      method: "POST",
      data: {
        email: email,
        code: code,
        codeURL: codeURL
      },
    })

    // returning the product returned by the API
    return response
  },

  //Verify Email Code
  verifyEmailCode: async function (email, code) {

    try {
      const response = await api.request({
        url: `/users/confirmVerificationCode`,
        method: "POST",
        data: {
          email: email,
          code: code
        },
      })

      // returning the product returned by the API
      return response
    } catch (error) {
      if (error.response && error.response.status === 404) {
      
        showToast.error("Verification Failed", {
          description: 'Invalid code',
        })     
      }
    }
  },

  resetPassword: async function (token, password) {

    const response = await api.request({
      url: `/auth/reset-password`,
      method: "POST",
      params: {
        token: token,
      },
      data: {
        password: password,
      },
    })

    // returning the product returned by the API
    return response
  },

  forgotPassword: async function (email) {

    const response = await api.request({
      url: `/auth/forgot-password`,
      method: "POST",
      data: {
        email: email,
      },
    })

    // returning the product returned by the API
    return response
  },

  updateProfile: async function (id, name, username, email) {

    const response = await api.request({
      url: `/auth/update-profile`,
      method: "POST",
      data: {
        userId: id,
        name: name,
        username: username,
        email: email,
      },
    })

    // returning the product returned by the API
    return response
  },

  updatePassword: async function (username, password) {

    const response = await api.request({
      url: `/auth/update-password`,
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    })

    // returning the product returned by the API
    return response
  },

  getUserById: async function (id) {

    const response = await api.request({
      url: `/auth/getUserById`,
      method: "POST",
      data: {
        id: id,
      },
    })

    // returning the product returned by the API
    return response
  },

  getUserOwnedStocks: async function (sessionToken, businessId) {

    const response = await api.request({
      url: `/business/getUserOwnedStocks`,
      method: "POST",
      data: {
        sessionToken: sessionToken,
        businessId: businessId,
      },
    })

    // returning the product returned by the API
    return response.data
  },

  /**
   * Top Panel UI for User Dashboard
   * @param {*} sessionToken 
   * @returns 
   */
  getUserBalanceStocks: async function (sessionToken) {

    const response = await api.request({
      url: `/business/getUserBalancePorfolio`,
      method: "POST",
      data: {
        sessionToken: sessionToken,
      },
    })

    // returning the product returned by the API
    return response.data
  },

  /**
   * Middle Panel UI for Dashboard
   * @param {} sessionToken 
   * @returns 
   */
  getUserProfitValuation: async function (sessionToken) {

    const response = await api.request({
      url: `/business/getUserProfitValuation`,
      method: "POST",
      data: {
        sessionToken: sessionToken,
      },
    })
    
    // returning the product returned by the API
    return response.data
  },

  /**
   * Bottom Panel UI for Dashboard
   */
  getUserWatchList: async function (sessionToken) {

    try {
      const response = await api.request({
        url: `/users/getUserWatchlist`,
        method: "POST",
        data: {
          sessionToken: sessionToken,
        },
      });
  
      // returning the product returned by the API
      return response.data;
    } catch (error) {
      
      showToast.error("Authorization Error", {
        description: error.response.data.message,
      })     
    }
  },

};