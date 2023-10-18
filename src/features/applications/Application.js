import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectApplicationById } from './applicationsApiSlice'

const Application = ({ applicationId }) => {

    const application = useSelector(state => selectApplicationById(state, applicationId))

    const navigate = useNavigate()

    if (application) {
        const created = new Date(application.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/applications/${applicationId}`)

        return (
                <div className="card">
                    <div className="card-row">
                        <div>
                    
                            <h2 >{application.financeType.label}</h2>
                            <h3 >{application.title}</h3>
                            <label>Created on {created}</label>
                        </div>

                        <div className="card-row-icon">
                            <button
                                className="icon-button"
                                onClick={handleEdit}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                     </div>
                    </div>
                </div>
        )

    } else return null
}
export default Application