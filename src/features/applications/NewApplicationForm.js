import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewApplicationMutation } from "./applicationsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewApplicationForm = () => {

    const [addNewApplication, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewApplicationMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            navigate('/dash/applications')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [title, text].every(Boolean) && !isLoading

    const onSaveApplicationClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewApplication({ title, text })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveApplicationClicked}>
                <div className="form__title-row">
                    <h2>New Application</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

            </form>
        </>
    )

    return content
}

export default NewApplicationForm