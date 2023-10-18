import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectApplicationById } from './applicationsApiSlice'
import EditApplicationForm from './EditApplicationForm'

const EditApplication = () => {
    const { id } = useParams()

    const application = useSelector(state => selectApplicationById(state, id))

    const content = application ? <EditApplicationForm application={application} /> : <p>Loading...</p>

    return content
}
export default EditApplication
