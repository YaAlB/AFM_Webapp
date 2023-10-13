import { useGetApplicationsQuery } from "./applicationsApiSlice"
import Application from "./Application"

const ApplicationsList = () => {
    const {
        data: applications,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetApplicationsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = applications

        const tableContent = ids?.length
            ? ids.map(applicationId => <Application key={applicationId} noteId={applicationId} />)
            : null

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ApplicationsList