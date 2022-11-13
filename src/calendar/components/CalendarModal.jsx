import { addHours } from "date-fns/esm";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useMemo } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeModal } = useUiStore();
  const { activeEvent, startSavingEvent, onActiveEvent } = useCalendarStore();
  const [formSubmited, setFormSubmited] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const { title, notes, start, end } = formValues;

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return title.length > 0 ? "" : "is-invalid";
  }, [formSubmited, title]);

  useEffect(() => {
    
    if (activeEvent !== null) {
       setFormValues({ ...activeEvent });
    }

  }, [activeEvent]);

  const onCloseModal = () => {
    closeModal();
    onActiveEvent(null);
  };

  const onChangeForm = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (date, changing) => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(end, start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorretas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (title.length <= 0) {
      return;
    }

    await startSavingEvent(formValues);
    closeModal();
    setFormSubmited(false);
  };

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={start}
              onChange={(date) => onDateChanged(date, "start")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              timeCaption="Hora"
              locale="es"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={start}
              selected={end}
              onChange={(date) => onDateChanged(date, "end")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
              timeCaption="Hora"
              locale="es"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              onChange={onChangeForm}
              value={title}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              style={{ resize: "none" }}
              onChange={onChangeForm}
              value={notes}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
