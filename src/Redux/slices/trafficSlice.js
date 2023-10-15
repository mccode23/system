import { createSlice } from '@reduxjs/toolkit'

export const trafficSlice = createSlice({
  name: 'traffic',
  initialState: {
    traffic: {} 
  },
  reducers: {
    sendRequest: (state,action) => {
      const {from,to,requestKey} = action.payload
      let currRequests = {}
      if(state.traffic.hasOwnProperty(from) && state.traffic[from].hasOwnProperty(to)) {
        currRequests = state.traffic[from][to][1]
      }
      currRequests[requestKey] = true

      state.traffic = {
        ...state.traffic,
        [from]: {
          ...state.traffic[from],
          [to]: [requestKey, currRequests],
        },
      };
    },
  }
})

export const { sendRequest, getRequest } = trafficSlice.actions

export default trafficSlice.reducer