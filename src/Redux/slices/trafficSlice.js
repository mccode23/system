import { createSlice } from '@reduxjs/toolkit'

export const trafficSlice = createSlice({
  name: 'traffic',
  initialState: {
    traffic: {} 
  },
  reducers: {
    sendRequest: (state,action) => {
      const {from,to,requestKey} = action.payload
      let currRequests = []
      if(state.traffic.hasOwnProperty(from) && state.traffic[from].hasOwnProperty(to)) {
        currRequests = state.traffic[from][to]
      }
      currRequests.push(requestKey)

      state.traffic = {
        ...state.traffic,
        [from]: {
          ...state.traffic[from],
          [to]: currRequests,
        },
      };
    },
    recievedRequest: (state,action) => {
      const {from,to} = action.payload
      if(state.traffic.hasOwnProperty(from) && state.traffic[from].hasOwnProperty(to)) {
        let newArray = state.traffic[from][to].slice(1)
        state.traffic = {
          ...state.traffic,
          [from]: {
            ...state.traffic[from],
            [to]: newArray,
          },
        };
      }
    },
  }
})

export const { sendRequest, recievedRequest } = trafficSlice.actions

export default trafficSlice.reducer