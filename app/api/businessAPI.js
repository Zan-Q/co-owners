import { api } from "./config/axiosConfig";

//Toast
import { toast as showToast, toast } from 'sonner'
//import { ToastContainer, toast as showToast } from 'react-toastify';

export const businessAPI = {
    
    createBusiness: async function (name, address, city, state, country, latitude, longitude, website, description, image, businessImages) {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('logo', image);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('website', website);
        formData.append('description', description);
        
        businessImages.forEach((file) => {
          formData.append('files', file);
        });

        try {
            const response = await api.request({
                url: `/business/createBusiness`,
                method: "POST",
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            
            // returning the product returned by the API
            return response;
        }
         catch (error) {

            // Show error toast
            showToast.error("Creation Error", {
              description: 'Error in creating this business',
            })        

            throw error; // Re-throw the error to be handled by the caller
        }
    },
};