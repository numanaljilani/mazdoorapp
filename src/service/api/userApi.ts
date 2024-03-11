// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userzApi = createApi({
  reducerPath: 'userzApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.52.213:3000/' }),
  endpoints: (builder) => ({

    registerPhoneNumber : builder.mutation({
      query: (args) => {
        console.log(args , ">>>>>>>")
        return {
          url: "user/phone",
          method: "POST",
          body: args,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    verifyOtp : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "user/verify",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
    uploadProfile : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "user/profile",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
    becomeWorker : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "user/create-worker",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
    completeProfile : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "user/create",
          method: "POST",
          body: args.body,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useRegisterPhoneNumberMutation , useVerifyOtpMutation , useUploadProfileMutation , useCompleteProfileMutation , useBecomeWorkerMutation} = userzApi