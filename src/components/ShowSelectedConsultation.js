import React, { useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ModifyConsultation } from './ModifyConsultation';

export const ShowSelectedConsultation = (props) => {

    const { state } = useLocation();
    const [show, setShow] = useState(false);
    const [visibleModifyConsultation, setVisibleModifyConsultations] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const handleOpen = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        props?.handleCloseShowSelectedConsultation();
    }

    const showModifyConsultation = (consultation) => {
        setSelectedConsultation(consultation)
        setVisibleModifyConsultations(true)
        setShow(false)
    }

    const hideShowModifyConsultation = () => {
        setVisibleModifyConsultations(false)
        props?.handleCloseShowSelectedConsultation();
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
    }, []);

    return (
        <Container>
            {visibleModifyConsultation && <ModifyConsultation consultation={selectedConsultation} handleCloseModifyConsultation={hideShowModifyConsultation} />}
            <Modal show={show} onHide={handleClose} id="viewConsultationModal">
                <Container>
                    <div className='mt-4'>
                        <h5>Chief Complaint:</h5>
                        <strong>{props?.consultation.chief_complaint}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>History of Illness:</h5>
                        <strong>{props?.consultation.history_of_illness}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>Review of systems:</h5>
                        <strong>{props?.consultation.review_of_systems}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>Examinations:</h5>
                        <strong>{props?.consultation.examination}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>Assessments/Plans:</h5>
                        <strong>{props?.consultation.assessment}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>Medication:</h5>
                        <strong>{props?.consultation.medication}</strong>
                    </div>
                    <div className='mt-4'>
                        <h5>Sick leave:</h5>
                        <strong>{props?.consultation.sick_leave}</strong>
                    </div>
                    <div className='mt-4 mb-4'>
                        <h5>Created At:</h5>
                        <strong>{formatDate(props?.consultation.created_at)}</strong>
                    </div>
                    {
                        state?.user.id === props?.consultation?.doctor_id ?
                            <div className="btnPrimary" onClick={() => showModifyConsultation(props?.consultation)}>
                                Modify consultation
                            </div>
                            : ""
                    }
                </Container>
            </Modal>
        </Container>
    );
}