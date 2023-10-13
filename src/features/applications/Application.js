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

        const updated = new Date(application.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/applications/${applicationId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {application.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{application.title}</td>
                <td className="table__cell note__username">{application.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Application