import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Modal, Table } from 'react-bootstrap';
import { ShowSelectedConsultation } from './ShowSelectedConsultation';

export const ShowAllConsultations = (props) => {

    const BASE_URL = 'https://backend.alsahaba.sa/api';
    const [doctors, setDoctors] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [selectedConsultation, setSelectedConsultation] = useState("");
    const [show, setShow] = useState(false);
    const [visibleShowSelectedConsultation, setVisibleShowSelectedConsultation] = useState(false);

    const showSelectedConsultation = (consultation) => {
        setSelectedConsultation(consultation)
        setVisibleShowSelectedConsultation(true)
        setShow(false)
    }

    const hideShowSelectedConsultations = () => {
        setVisibleShowSelectedConsultation(false)
        props?.handleCloseAllConsultations();
    }

    const handleOpen = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        props?.handleCloseAllConsultations();
    }

    const fetchConsultations = async () => {
        await axios.get(`${BASE_URL}/consultations/`)
            .then((response) => {
                setConsultations(response.data);
            })
    }

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);

        // Split the formatted date into day, month, and year parts
        const [month, day, year, hour, minute] = formattedDate.split(' ');

        // Convert the month abbreviation to uppercase
        const capitalizedMonth = month.toUpperCase();

        // Return the formatted date with uppercase month abbreviation and desired format
        return `${day} ${capitalizedMonth} ${year} ${hour} ${minute}`;
    }
    useEffect(() => {
        handleOpen();
        fetchConsultations();
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setDoctors(response.data);
        })
    }

    return (
        <Container>
            {visibleShowSelectedConsultation && <ShowSelectedConsultation consultation={selectedConsultation} handleCloseShowSelectedConsultation={hideShowSelectedConsultations} />}
            <Modal show={show} onHide={handleClose} id="showAllConsultationsModal">
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Dr. Name</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody style={{ cursor: 'pointer' }}>
                            {consultations && consultations?.filter(consultation => consultation.patient_id === props.patient.id).map((filteredConsultation, index) => (
                                <tr key={filteredConsultation.id} onClick={() => showSelectedConsultation(filteredConsultation)}>
                                    {
                                        <>
                                            <td>
                                                <span style={{ color: "#0f0f17" }}>{index + 1}</span>
                                            </td>
                                            {doctors?.filter(doctor => filteredConsultation.doctor_id === doctor.id).map((filteredDoctor) => (
                                                <td key={filteredDoctor.id}>
                                                    <span style={{ color: "#0f0f17", marginTop: "15px", fontSize: '14px' }}>
                                                        <strong>Dr. ID: &nbsp;{filteredDoctor.id}</strong>
                                                        <br />
                                                        <strong>{filteredDoctor.full_name}</strong>
                                                        <br />
                                                        <span style={{ color: '#3c3c3c', fontSize: "11px", position: 'relative', top: '-3px' }}>
                                                            {filteredConsultation.chief_complaint}
                                                        </span>
                                                    </span>
                                                </td>
                                            ))}
                                            <td>
                                                <strong style={{ fontSize: '12px' }}>{formatDate(filteredConsultation.created_at)}</strong>
                                            </td>
                                        </>
                                    }
                                </tr>
                            )
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </Container>
    );
}