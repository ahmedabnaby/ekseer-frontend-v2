import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, FormSelect, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Contact = () => {
    const BASE_URL = 'https://backend.alsahaba.sa/api';

    const { state } = useLocation();
    console.log(state);
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("full_name", e.target.full_name.value);
        bodyFormData.append("mobile_number", e.target.mobile_number.value);
        bodyFormData.append("email", e.target.email.value);
        bodyFormData.append("message", e.target.message.value);

        try {
            axios({
                method: "post",
                url: `${BASE_URL}/send-email/`,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    setFullName("")
                    setEmail("")
                    setMobileNumber("")
                    setMessage("")
                    setIsLoading(false)
                    handleClose();
                    console.log(response)
                })
                .catch(function (response) {
                    setFullName("")
                    setEmail("")
                    setMobileNumber("")
                    setMessage("")
                    setIsLoading(false)
                    handleClose();
                    console.log(response);
                });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {!isLoading &&
                            <>
                                {state?.currentLanguage === "en" ?
                                    <>
                                        {/* /CONTACT US PAGE ENGLISH */}
                                        <Row>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleContactSubmit}>
                                                    <h2>Contact us<span id="cutomText">&nbsp;here</span></h2>
                                                    <FormLabel htmlFor="full_name" className="ekseerForm-label">Your Full Name</FormLabel>
                                                    <FloatingLabel
                                                        controlId="full_name"
                                                        label="Enter your full name"
                                                        className="mb-3 ekseerFormInnerLabel"
                                                    >
                                                        <FormControl type="text" name="full_name" placeholder="Enter your full name" required
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)} />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="mobile_number" className="ekseerForm-label">Mobile number</FormLabel>
                                                            <FloatingLabel
                                                                controlId="mobile_number"
                                                                label="Ex: 5XXXXXXXX"
                                                                className="mb-3 ekseerFormInnerLabel"
                                                            >
                                                                <FormControl type="number" name="mobile_number" placeholder="Ex: 5XXXXXXXX" required
                                                                    value={mobileNumber}
                                                                    onChange={(e) => setMobileNumber(e.target.value)} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="email" className="ekseerForm-label">Email address</FormLabel>
                                                            <FloatingLabel
                                                                controlId="email"
                                                                label="Email address"
                                                                className="mb-3 ekseerFormInnerLabel"
                                                            >
                                                                <FormControl type="email" name="email" placeholder="Email address" required
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <Form.Label className="ekseerForm-label">Your message:</Form.Label>
                                                    <FloatingLabel
                                                        controlId="message"
                                                        label="Enter your message"
                                                        className="mb-3 ekseerFormInnerLabel h-25"
                                                    >
                                                        <Form.Control as="textarea" rows={4} name='message' placeholder="Enter your message ..." required />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnLeft">
                                                        Send message
                                                    </Button>
                                                </Form>
                                            </Col>
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/contact.png" className="float" />
                                            </Col>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>We recieved your message, thank you!</Modal.Title>
                                                </Modal.Header>
                                                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
                                            </Modal>
                                        </Row>
                                    </>
                                    :
                                    <>
                                        {/* /CONTACT US PAGE ARABIIC */}
                                        <Row className="wrapReverse">
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/contact.png" className="float" />
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "right" }} onSubmit={handleContactSubmit}>
                                                    <h2>تواصل معنا</h2>
                                                    <FormLabel htmlFor="full_name" className="ekseerForm-labelAr">:الاسم الكامل</FormLabel>
                                                    <FloatingLabel
                                                        controlId="full_name"
                                                        label="الاسم الكامل"
                                                        className="mb-3 ekseerFormInnerLabelAr"
                                                    >
                                                        <FormControl type="text" name="full_name" placeholder="الاسم الكامل" required />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="mobile_number" className="ekseerForm-labelAr">:رقم الجوال</FormLabel>
                                                            <FloatingLabel
                                                                controlId="mobile_number"
                                                                label="Ex: 5XXXXXXXX"
                                                                className="mb-3 ekseerFormInnerLabelAr ekseerFormInnerLabelAr-sm"
                                                            >
                                                                <FormControl type="number" name="mobile_number" placeholder="Ex: 5XXXXXXXX" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="email" className="ekseerForm-labelAr">:البريد الالكتروني</FormLabel>
                                                            <FloatingLabel
                                                                controlId="email"
                                                                label="البريد الالكتروني"
                                                                className="mb-3 ekseerFormInnerLabelAr ekseerFormInnerLabelAr-sm"
                                                            >
                                                                <FormControl type="email" name="email" placeholder="البريد الالكتروني" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <Form.Label className="ekseerForm-labelAr">:الرسالة</Form.Label>
                                                    <FloatingLabel
                                                        controlId="message"
                                                        label="نص الرسالة"
                                                        className="mb-3 ekseerFormInnerLabelAr h-25"
                                                    >
                                                        <Form.Control as="textarea" rows={4} name='message' placeholder="... نص الرسالة" required />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnRight">
                                                        ارسال الرسالة
                                                    </Button>
                                                </Form>
                                            </Col>
                                            <Modal show={show} onHide={handleClose} dir="rtl">
                                                <Modal.Header closeButton>
                                                    <Modal.Title className='colorBlackAr'>تم أرسال الرسالة بنجاح</Modal.Title>
                                                </Modal.Header>
                                                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
                                            </Modal>
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
                </div>
            </Container >
        </>
    )
}