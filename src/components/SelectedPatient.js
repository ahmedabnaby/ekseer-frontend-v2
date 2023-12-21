import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { ShowAllConsultations } from './ShowAllConsultations';

export const SelectedPatient = (props) => {
    const [show, setShow] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(false);
    const [visibleSelectedConsultations, setVisibleSelectedConsultations] = useState(false);

    const showAllConsultations = (patient) => {
        setSelectedPatient(patient)
        setVisibleSelectedConsultations(true)
        setShow(false)
    }
    const hideAllConsultations = () => {
        setVisibleSelectedConsultations(false)
        props?.handleCloseSelectedPatient();
    }
    const handleOpen = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        props.handleCloseSelectedPatient();
    }
    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    useEffect(() => {
        handleOpen();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose} id="viewConsultationModal">
                <Modal.Header>
                    <Modal.Title>
                        Viewing the profile of: &nbsp;
                        <strong style={{ color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>
                            {props.patient.full_name}
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='align-center'>
                            <Col>
                                <div>
                                    <h5>Age:</h5>
                                    <span style={{ position: 'relative', top: '5px', color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>{getAge(props.patient.date_of_birth)}</span>
                                </div>
                                <div className='mt-3'>
                                    <h5>ID/Iqama number:</h5>
                                    <span style={{ position: 'relative', top: '5px', color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>{props.patient.iqama_number}</span>
                                </div>
                                <div className='mt-3'>
                                    <h5>Mobile number:</h5>
                                    <span style={{ position: 'relative', top: '5px', color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>{props.patient.mobile_number}</span>
                                </div>
                                <div className='mt-3'>
                                    <h5>Email address:</h5>
                                    <span style={{ position: 'relative', top: '5px', color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>{props.patient.email}</span>
                                </div>
                                <div className='mt-3'>
                                    <h5>Nationality:</h5>
                                    <span style={{ position: 'relative', top: '5px', color: 'black', padding: '5px', borderRadius: '15px', fontWeight: '500' }}>{props.patient.nationality}</span>
                                </div>
                            </Col>
                            <Col>
                                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
                            </Col>
                            <div className="btnPrimary" onClick={() => showAllConsultations(props.patient)} >
                                View all consultations
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            {visibleSelectedConsultations && <ShowAllConsultations patient={selectedPatient} handleCloseAllConsultations={hideAllConsultations} />}
        </>
    );
}