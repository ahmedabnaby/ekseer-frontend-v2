import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { SelectedPatient } from '../components/SelectedPatient';
import { ShowSelectedConsultation } from '../components/ShowSelectedConsultation';

export const Consultations = () => {

    const BASE_URL = 'https://backend.alsahaba.sa/api';
    const { state } = useLocation();
    const [consultations, setConsultations] = useState([]);
    const [newConsultations, setNewConsultations] = useState(false);

    const [visibleSelectedPatient, setVisibleSelectedPatient] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState([]);

    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [visibleSelectedConsultation, setVisibleSelectedConsultation] = useState(false);

    const [doctorsOrPatients, setDoctorsOrPatients] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    var uniquePatients = []
    var uniqueConsultations = []

    const fetchConsultations = async () => {
        setIsLoading(true)
        await axios.get(`${BASE_URL}/consultations/`)
            .then((response) => {
                setConsultations(response.data);
                setIsLoading(false)
                var i = 0;
                if (state?.user.is_doctor === false) {
                    while (i < response.data.length) {
                        if ((response.data[i].patient_id === state?.user.id)) {
                            setNewConsultations(true);
                            break;
                        }
                        else {
                            setNewConsultations(false);
                        }
                        i++
                    }
                } else {
                    while (i < response.data.length) {
                        if ((response.data[i].doctor_id === state?.user.id)) {
                            setNewConsultations(true);
                            break;
                        }
                        else {
                            setNewConsultations(false);
                        }
                        i++
                    }
                }
            })
    }
    const fetchDoctorsOrPatients = async () => {
        await axios.get(`${BASE_URL}/users/`)
            .then((response) => {
                setDoctorsOrPatients(response.data);
            })
    }

    // DOCTORS CONSULTATIONS
    const getUniquePatients = () => {
        for (var i = 0; i < doctorsOrPatients.length; i++) {
            for (var j = 0; j < consultations.length; j++) {
                if (consultations[j].patient_id === doctorsOrPatients[i].id) {
                    uniquePatients.push(doctorsOrPatients[i])
                }
            }
        }
        let output = [...new Map(uniquePatients.map(item => [item.id, item])).values()];
        return output;
    }

    const getUniqueConsultations = () => {
        for (var i = 0; i < consultations.length; i++) {
            for (var j = 0; j < getUniquePatients().length; j++) {
                if (consultations[i].patient_id === getUniquePatients()[j].id) {
                    uniqueConsultations.push(consultations[i])
                }
            }
        }
        let output = [...new Map(uniqueConsultations.filter(item => item.doctor_id === state?.user.id).map(item => [item.patient_id, item])).values()];
        return output;
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

    const showSelectedPatient = (patient) => {
        setVisibleSelectedPatient(true)
        setSelectedPatient(patient)
    }
    const hideSelectedPatient = () => {
        setVisibleSelectedPatient(false);
    };

    const showSelectedConsultation = (consultation) => {
        setSelectedConsultation(consultation)
        setVisibleSelectedConsultation(true)
    }
    const hideShowSelectedConsultations = () => {
        setVisibleSelectedConsultation(false)
    }
    useEffect(() => {
        fetchConsultations();
        fetchDoctorsOrPatients();
    }, []);

    return (
        <Container className="mt-5">
            <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                {!isLoading &&
                    <>
                        {state?.currentLanguage === "en" ?
                            <>
                                {/* /CONSULTATION PAGE ENGLISH */}
                                <Row className='align-center'>
                                    <Col md={6} sm={12}>
                                        <div className="ekseerForm" style={{ textAlign: "left" }}>
                                            <h2>My <span id="cutomText">&nbsp;Consultations</span></h2>
                                            {!newConsultations ?
                                                <h5 className='ml-4'>No consultations yet!</h5>
                                                :
                                                <>
                                                    {/* DOCTOR CONSULTATION */}
                                                    <>
                                                        {getUniqueConsultations()?.filter(consultation => consultation.doctor_id === state?.user?.id).map((filteredConsultation, index) => (
                                                            <ListGroup as="ol" key={filteredConsultation.id}>
                                                                {getUniquePatients()?.filter(patient => filteredConsultation.patient_id === patient.id).map((filteredPatient) => (
                                                                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" key={filteredPatient.id} style={{ cursor: 'pointer' }} onClick={() => showSelectedPatient(filteredPatient)}>
                                                                        {index + 1}.
                                                                        <div className="ms-2 me-auto">
                                                                            <div className="fw-bold">
                                                                                {filteredPatient.full_name}
                                                                                <br />
                                                                                Patient ID: &nbsp;{filteredPatient.id}
                                                                                <br />
                                                                                <span style={{ marginLeft: "3px" }}>View profile</span>
                                                                            </div>
                                                                        </div>
                                                                        <strong>Last consultation on: <br />{formatDate(filteredConsultation.created_at)}</strong>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        )
                                                        )}
                                                        {visibleSelectedPatient && <SelectedPatient patient={selectedPatient} handleCloseSelectedPatient={hideSelectedPatient} />}
                                                    </>
                                                    {/* PATIENT CONSULTATION */}
                                                    {visibleSelectedConsultation && <ShowSelectedConsultation consultation={selectedConsultation} handleCloseShowSelectedConsultation={hideShowSelectedConsultations} />}
                                                    <>
                                                        {consultations && consultations?.filter(consultation => consultation.patient_id === state?.user?.id).map((filteredConsultation, index) => (
                                                            <ListGroup as="ol" key={filteredConsultation.id}>
                                                                {doctorsOrPatients?.filter(doctor => filteredConsultation.doctor_id === doctor.id).map((filteredDoctor) => (
                                                                    <ListGroup.Item
                                                                        as="li"
                                                                        className="d-flex justify-content-between align-items-center"
                                                                        style={{ cursor: 'pointer' }}
                                                                        key={filteredDoctor.id}
                                                                        onClick={() => showSelectedConsultation(filteredConsultation)}>
                                                                        {index + 1}.
                                                                        <div className="ms-2 me-auto">
                                                                            <div className="fw-bold">{filteredConsultation.chief_complaint}</div>
                                                                            <strong style={{ color: 'gray' }}>Dr. ID: &nbsp;{filteredDoctor.id}</strong>
                                                                            <br />
                                                                            <strong>{filteredDoctor.full_name}</strong>
                                                                        </div>
                                                                        <strong>{formatDate(filteredConsultation.created_at)}</strong>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        )
                                                        )}
                                                    </>
                                                </>
                                            }
                                        </div>
                                    </Col>
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/consultations.png" className="float" />
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                                {/* /CONSULTATION PAGE ARABIIC */}
                                <Row className="wrapReverse align-center">
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/consultations.png" id="scientistImg" className="float" />
                                    </Col>
                                    <Col md={6} sm={12} dir='rtl'>
                                        {visibleSelectedConsultation && <ShowSelectedConsultation consultation={selectedConsultation} handleCloseShowSelectedConsultation={hideShowSelectedConsultations} />}
                                        <>
                                            {consultations && consultations?.filter(consultation => consultation.patient_id === state?.user?.id).map((filteredConsultation, index) => (
                                                <ListGroup as="ol" key={filteredConsultation.id}>
                                                    {doctorsOrPatients?.filter(doctor => filteredConsultation.doctor_id === doctor.id).map((filteredDoctor) => (
                                                        <ListGroup.Item as="li" dir='rtl' className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} key={filteredDoctor.id} onClick={() => showSelectedConsultation(filteredConsultation)}>
                                                            <div className="text-right">
                                                                <div className="fw-bold">{index + 1}.{filteredConsultation.chief_complaint}</div>
                                                                <strong style={{ color: 'gray' }}>Dr. ID: &nbsp;{filteredDoctor.id}</strong>
                                                                <br />
                                                                <strong>{filteredDoctor.full_name}</strong>
                                                            </div>
                                                            <strong>{formatDate(filteredConsultation.created_at)}</strong>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            )
                                            )}
                                        </>
                                    </Col>
                                </Row>
                            </>
                        }
                    </>
                }
                {isLoading &&
                    <div className='spinner'>
                        <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
                    </div>
                }
            </div>
        </Container>
    );
}