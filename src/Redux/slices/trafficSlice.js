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
      let currResponses = []
      if(state.traffic.responses.hasOwnProperty(from) && state.traffic.responses[from].hasOwnProperty(to)) {
        currResponses = state.traffic.responses[from][to]
      }
      currResponses.push(requestKey)
      state.traffic = {
        ...state.traffic,
        responses: {
          ...state.traffic.responses,
          [from]: {
            ...state.traffic.responses[from],
            [to]: currResponses,
          },
        }
      };
      }
      
    },
    recievedRequest: (state,action) => {
      const {from,to} = action.payload
      if(state.traffic.requests.hasOwnProperty(from) && state.traffic.requests[from].hasOwnProperty(to)) {
        if(state.traffic.requests[from][to].length > 0) {
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
        } else {
          const newTraffic = {...state.traffic}
          console.log("newTraffic")
          delete newTraffic.requests[from][to]
          state.traffic = newTraffic
        }
      }
    },
  }
})

export const { sendRequest, recievedRequest } = trafficSlice.actions

export default trafficSlice.reducer