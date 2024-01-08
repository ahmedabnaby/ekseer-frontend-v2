import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Container, FloatingLabel, Form, FormControl, FormLabel, Button, Modal, Image } from 'react-bootstrap';
import axios from 'axios';

export const ModifyConsultation = (props) => {

    console.log(props)
    const BASE_URL = 'https://backend.alsahaba.sa/api';
    const { state } = useLocation();

    const [show, setShow] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [medication, setMedication] = useState(false)
    const [sickLeave, setSickLeave] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        props?.handleCloseModifyConsultation();
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        props?.handleCloseModifyConsultation();
    }

    const medic = (e) => {
        if (e.target.value === "YES") {
            setMedication(true)
        } else {
            setMedication(false)
        }
    }
    const sick = (e) => {
        if (e.target.value === "YES") {
            setSickLeave(true)
        } else {
            setSickLeave(false)
        }
    }

    const handleModifyConsultationSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        var bodyFormData = new FormData();
        var doctor_id = state?.user.id
        bodyFormData.append("doctor_id", doctor_id);
        bodyFormData.append("patient_id", props?.consultation?.patient_id);
        bodyFormData.append("chief_complaint", e.target.chief_complaint.value);
        bodyFormData.append("history_of_illness", e.target.history_of_illness.value);
        bodyFormData.append("review_of_systems", e.target.review_of_systems.value);
        bodyFormData.append("examination", e.target.examination.value);
        bodyFormData.append("assessment", e.target.assessment.value);
        if (e.target.medication === undefined) {
            bodyFormData.append("medication", "No");
        }
        else {
            bodyFormData.append("medication", e.target.medication.value);
        }
        if (e.target.sick_leave === undefined) {
            bodyFormData.append("sick_leave", 0);
        }
        else {
            bodyFormData.append("sick_leave", e.target.sick_leave.value);
        }
        await axios({
            method: "put",
            url: `${BASE_URL}/update-consultation/${props?.consultation.id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                setIsLoading(false);
                setShowSuccessModal(true)
                setShow(false)
                setTimeout(() => {
                    setShowSuccessModal(false)
                    handleClose();
                }, 2000)
            })
            .catch(function (response) {
                console.log(response);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        handleOpen();
    }, []);

    return (
        <Container>
            {!isLoading &&
                <Modal show={show} onHide={handleClose} id="consultationModal">
                    <Modal.Body>
                        <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleModifyConsultationSubmit}>
                            <div className="row">
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">Chief Complaint:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='chief_complaint' defaultValue={props?.consultation.chief_complaint} placeholder="Chief Complaint ..." required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">History of Presenting Illness:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='history_of_illness' defaultValue={props?.consultation.history_of_illness} placeholder="History of Presenting Illness ..." required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">Review of Systems:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='review_of_systems' defaultValue={props?.consultation.review_of_systems} placeholder="Review of Systems ..." required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">Examination:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='examination' defaultValue={props?.consultation.examination} placeholder="Examination ..." required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">Assessment/Plan:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='assessment' defaultValue={props?.consultation.assessment} placeholder="Assessment/Plan ..." required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="ekseerForm-label">Prescribe Medication</Form.Label>
                                    <div className='d-flex mb-4' id='d-flex'>
                                        <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo" defaultValue="YES" onChange={medic} />
                                        <Form.Check type='radio' label="No" id="no" name="yesOrNo" defaultChecked onChange={medic} />
                                    </div>
                                    {medication &&
                                        <>
                                            <Form.Control as="textarea" rows={3} id='medic' name='medication' defaultValue={props?.consultation.medication} placeholder="Write the full prescription medications ..." required />
                                            <Container>
                                                <h5 style={{ marginBottom: '10px' }}>We can help you order medics from here, choose your OS and download
                                                    <span style={{ color: "#24ab94" }}> Anat App </span>now!</h5>
                                                <div className="d-flex">
                                                    <div>
                                                        <a href='https://play.google.com/store/apps/details?id=com.lean.practitioner' target='_blank'>
                                                            <img src={process.env.PUBLIC_URL + '/assets/images/icons/google-play.png'} style={{ width: '45px' }} />
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <a href='https://apps.apple.com/sa/app/anat-%D8%A3%D9%86%D8%A7%D8%A9/id1472911277' target='_blank'>
                                                            <img src={process.env.PUBLIC_URL + '/assets/images/icons/app-store.png'} style={{ width: '35px', position: 'relative', top: '5px', left: '25px' }} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </Container>
                                        </>
                                    }
                                </Form.Group>
                                <Form.Group>
                                    <FormLabel htmlFor="sick_leave" className="ekseerForm-label">Prescribe Sick-leave</FormLabel>
                                    <div className='d-flex mb-4' id='d-flex'>
                                        <Form.Check type='radio' label="Yes" id="yes1" name="yesOrNo1" defaultValue="YES" onChange={sick} />
                                        <Form.Check type='radio' label="No" id="no1" name="yesOrNo1" defaultChecked onChange={sick} />
                                    </div>
                                    {sickLeave &&
                                        <FloatingLabel
                                            label="How many days?"
                                            className="mb-3 ekseerFormInnerLabel"
                                        >
                                            <FormControl id='sick' name='sick_leave' defaultValue={props?.consultation.sick_leave} type='number' placeholder="How many days?" required />
                                        </FloatingLabel>
                                    }
                                </Form.Group>
                                <div className="col-xl-12">
                                    <Button type="submit" className="btnPrimary btnLeft">
                                        Modify consultation
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    </Modal.Body>
                </Modal>
            }
            {isLoading &&
                <div className='spinner'>
                    <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
                </div>
            }
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Consultation modified successfully!</Modal.Title>
                </Modal.Header>
                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
            </Modal>
        </Container>
    );
}