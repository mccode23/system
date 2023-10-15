import { configureStore } from '@reduxjs/toolkit'
import trafficReducer from '../slices/trafficSlice'

export default configureStore({
  reducer: {
    traffic: trafficReducer
  }
})