import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const applicationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = applicationsAdapter.getInitialState()

export const applicationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getApplications: builder.query({
            query: () => '/applications',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedApplications = responseData.map(application => {
                    application.id = application._id
                    return application
                });
                return applicationsAdapter.setAll(initialState, loadedApplications)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Application', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Application', id }))
                    ]
                } else return [{ type: 'Application', id: 'LIST' }]
            }
        }),
        addNewApplication: builder.mutation({
            query: initialApplication => ({
                url: '/applications',
                method: 'POST',
                body: {
                    ...initialApplication,
                }
            }),
            invalidatesTags: [
                { type: 'Application', id: "LIST" }
            ]
        }),
        updateApplication: builder.mutation({
            query: initialApplication => ({
                url: '/applications',
                method: 'PATCH',
                body: {
                    ...initialApplication,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Application', id: arg.id }
            ]
        }),
        deleteApplication: builder.mutation({
            query: ({ id }) => ({
                url: `/applications`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: 'Application', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetApplicationsQuery,
    useAddNewApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = applicationsApiSlice

// returns the query result object
export const selectApplicationsResult = applicationsApiSlice.endpoints.getApplications.select()

// creates memoized selector
const selectApplicationsData = createSelector(
    selectApplicationsResult,
    applicationsResult => applicationsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllApplications,
    selectById: selectApplicationById,
    selectIds: selectApplicationIds
    // Pass in a selector that returns the applications slice of state
} = applicationsAdapter.getSelectors(state => selectApplicationsData(state) ?? initialState)