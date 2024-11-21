import { api } from "./config/axiosConfig";

//Toast
import { toast } from 'react-toastify';

export const transactionAPI = {
    
    buyStock: async function (businessId, amount, token) {

        try {
            const response = await api.request({
                url: `/trade/buyShare`,
                method: "POST",
                data: {
                    businessId: businessId,
                    price: amount,
                    token: token
                },
            })
            
            // returning the product returned by the API
            return response;
        } catch (error) {

            // Show error toast
            toast.error('You have insufficient funds to buy this stock');

            throw error; // Re-throw the error to be handled by the caller
        }
    },

    sellStock: async function (businessId, amount, token) {

        const response = await api.request({
          url: `/trade/sellShare`,
          method: "POST",
          data: {
            businessId: businessId,
            price: amount,
            token: token
          },
        })
        
        // returning the product returned by the API
        return response;
    },

    sendPayment: async function (amount, token, redirectURL) {

        const response = await api.request({
          url: `/payment/sendPayment`,
          method: "POST",
          data: {
            amount: amount,
            token: token,
            redirectURL: redirectURL
          },
        })
        
        // returning the product returned by the API
        return response;
    },

    addToWatchlist: async function (businessId, token) {

        const response = await api.request({
          url: `/users/addToWatchlist`,
          method: "POST",
          data: {
            businessId: businessId,
            token: token
          },
        })

        // returning the product returned by the API
        return response;
    },

    removeFromWatchlist: async function (businessId, token) {
        
          const response = await api.request({
            url: `/users/removeFromWatchlist`,
            method: "POST",
            data: {
              businessId: businessId,
              token: token
            },
          })
  
          // returning the product returned by the API
          return response;
      },

      //Withdraw Payment
      withdrawFunds: async function (amount, token) {
        
        const response = await api.request({
          url: `/users/withdrawFunds`,
          method: "POST",
          data: {
            amount: amount,
            token: token
          },
        })
        
        // returning the product returned by the API
        return response;
      },

      /*------------------- Receipts -------------------*/
      //Upload Receipt
      uploadReceipt: async function (businessId, fileUrl, sessionToken) {
        
        const response = await api.request({
          url: `/trade/saveReceipt`,
          method: "POST",
          data: {
            businessId: businessId,
            receiptUrl: fileUrl,
            sessionToken: sessionToken
          },
        })
        
        // returning the product returned by the API
        return response;
      },

      //Get Receipts
      getReceipts: async function (businessId) {
        
        const response = await api.request({
          url: `/trade/getReceipts`,
          method: "GET",
        })
        
        // returning the product returned by the API
        return response.data;
      },

      //Delete Receipt
      deleteReceipt: async function (receiptId) {
        
        const response = await api.request({
          url: `/trade/deleteReceipt`,
          method: "POST",
          data: {
            receiptId: receiptId
          },
        })
        
        // returning the product returned by the API
        return response;
      },

      //Process Receipt
      processReceipt: async function (receiptId, amount) {
        
        const response = await api.request({
          url: `/trade/processReceipt`,
          method: "POST",
          data: {
            receiptId: receiptId,
            amount: amount
          },
        })
        
        // returning the product returned by the API
        return response;
      },
};