import { api } from "./config/axiosConfig";

//Toast
import { toast as showToast, toast } from 'sonner'

export const leaderboardAPI = {

  getLeaderboard: async function (sessionToken) {
    
    try {
      const response = await api.request({
        url: `/users/getLeaderBoard`,
        method: "POST",
        data: {
          token: sessionToken,
        },
      })

      // returning the product returned by the API
      return response
    } catch (error) {
    
      showToast.error("Leaderboard Failed", {
        description: 'User not found',
      })         
    }
  }
}