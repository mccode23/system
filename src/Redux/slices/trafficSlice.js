import { createSlice } from '@reduxjs/toolkit'

export const trafficSlice = createSlice({
  name: 'traffic',
  initialState: {
    traffic: {
      requests: {},
      responses: {}
    } 
  },
  reducers: {
    sendRequest: (state,action) => {
      const {from,to,requestKey,type} = action.payload
      if(type === "request") {
      let currRequests = []
      if(state.traffic.requests.hasOwnProperty(from) && state.traffic.requests[from].hasOwnProperty(to)) {
        currRequests = state.traffic.requests[from][to]
      }
      currRequests.push(requestKey)
      state.traffic = {
        ...state.traffic,
        requests: {
          ...state.traffic.requests,
          [from]: {
            ...state.traffic.requests[from],
            [to]: currRequests,
          },
        }
      };
      } else {
        // response todoo
      }
      
    },
    recievedRequest: (state,action) => {
      const {from,to} = action.payload
      if(state.traffic.requests.hasOwnProperty(from) && state.traffic.requests[from].hasOwnProperty(to)) {
        let newArray = state.traffic.requests[from][to].slice(1)
        state.traffic = {
          ...state.traffic,
          requests: {
            ...state.traffic.requests,
            [from]: {
              ...state.traffic.requests[from],
              [to]: newArray,
            },
          }
        };
      }
    },
  }
})

export const { sendRequest, recievedRequest } = trafficSlice.actions

export default trafficSlice.reducer