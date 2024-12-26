// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../../env';
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userzApi = createApi({
  reducerPath: 'userzApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${env.server}/user` }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://mazdoor-server.onrender.com/' }),
  endpoints: (builder) => ({

 

    becomeWorker : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "/create-worker",
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
        return {
          url: "/",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
          },
        };
      },
    }),
    completeContractorRegistration : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        return {
          url: "/register-contractor",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
    updateProfile : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "/update",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
    uploadPost : builder.mutation({
      query: (args) => {
        console.log(args.body , ">>>>>>>")
        console.log(args.token , ">>>>>>> token")
        return {
          url: "/postimage",
          method: "POST",
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            "Authorization": `Bearer ${args.token}`,
          },
        };
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useUpdateProfileMutation  , useCompleteProfileMutation , useBecomeWorkerMutation , useUploadPostMutation , useCompleteContractorRegistrationMutation} = userzApi