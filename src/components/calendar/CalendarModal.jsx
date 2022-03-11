import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventRemoveActive, startAddNewEvent, startUpdateEvent } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const startTime = moment().minute(0).second(0).add(1, 'hours')
const endTime = startTime.clone().add(1, 'hours')

const initialStateForm = {
    title: '',
    notes: '',
    start: startTime.toDate(),
    end: endTime.toDate()
}


const CalendarModal = () => {

    const dispatch = useDispatch()
    const { modalOpen, dates } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.events)

    const [dateStart, setDateStart] = useState(startTime.toDate());
    const [dateFinish, setDateFinish] = useState(endTime.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initialStateForm);
    const { notes, title, start, end } = formValues


    /* Si cambia activeEvent y existe, es decir, encontramos un evento. Querremos que
    los formValues sean los datos del evento activo. No hace falta poner un else porque
    cada vez que cerramos el modal estamos reseteando el formulario con el initialStateForm.
    Con lo cual, si queremos añadir uno nuevo, ya estará este reseteado */
    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent)
            setDateStart(activeEvent.start)
            setDateFinish(activeEvent.end)
        } else {
            setFormValues(initialStateForm)
            setDateStart(initialStateForm.start)
            setDateFinish(initialStateForm.end)
        }

    }, [activeEvent, setFormValues]);

    useEffect(() => {
        if (dates) {
            setFormValues({
                ...formValues,
                start: dates.start,
                end: dates.end,
            })
            setDateStart(dates.start)
            setDateFinish(dates.end)
        }
    }, [dates, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleResetForm = () => {
        setFormValues(initialStateForm)
    }


    const closeModal = () => {
        dispatch(eventRemoveActive())
        dispatch(uiCloseModal())
        handleResetForm()
    }

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
        setDateStart(e)
    }

    const handleFinishDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
        setDateFinish(e)
    }


    const handleSubmitForm = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de inicio debe de ser menor que la de finalización', 'error')
        }

        if (title.trim().length === 0) {
            return setTitleValid(false)
        }

        if (activeEvent) {
            dispatch(startUpdateEvent(formValues))
        } else {
            dispatch(startAddNewEvent(formValues))
        }


        setTitleValid(true)
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h3 className='text-center font-weight-bold text-primary'>
                {activeEvent ? 'Editar evento' : 'Nuevo evento'
                }
            </h3>
            <hr className='mt-0' />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={dateStart} />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleFinishDateChange}
                        minDate={dateStart}
                        value={dateFinish} />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

export default CalendarModal