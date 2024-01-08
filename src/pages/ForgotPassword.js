import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
    const BASE_URL = "https://backend.alsahaba.sa/api";

    const { state } = useLocation();
    console.log(state)
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        var bodyFormData = new FormData();
        bodyFormData.append("email", e.target.email.value);
        axios({
            method: "post",
            url: `${BASE_URL}/password_reset/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setIsLoading(false);
                setShow(true)
                console.log(response);
            })
            .catch(function (response) {
                setIsLoading(false);
                console.log(response);
                if (response.response.data.email) {
                    setWrongCredentials(true)
                }
            });
    };
    const handleResetPasswordSubmitAr = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        var bodyFormData = new FormData();
        bodyFormData.append("email", e.target.email.value);
        axios({
            method: "post",
            url: `${BASE_URL}/password_reset/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setIsLoading(false);
                setShow(true)
                console.log(response);
            })
            .catch(function (response) {
                setIsLoading(false);
                console.log(response);
                if (response.response.data.email) {
                    setWrongCredentials(true)
                }
            });
    };
    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {!isLoading &&
                            <>
                                {state?.currentLanguage === "en" ?
                                    <>
                                        {/* /LOGIN PAGE ENGLISH */}
                                        <Row className='align-center'>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleResetPasswordSubmit}>
                                                    <h2>Reset <span id="cutomText">&nbsp; your password here</span></h2>
                                                    {wrongCredentials ? <p className="error">This email address is not registered!</p> : ''}
                                                    <FormLabel htmlFor="email" className="ekseerForm-label">E-mail address</FormLabel>
                                                    <FloatingLabel
                                                        label="E-mail address"
                                                        className="mb-3 ekseerFormInnerLabel"
                                                    >
                                                        <FormControl type="email" name="email" placeholder="E-mail address" />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnLeft">
                                                        Reset password
                                                    </Button>
                                                </Form>
                                            </Col>
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/scientist.png" className="float" />
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    <>
                                        {/* /LOGIN PAGE ARABIIC */}
                                        <Row className="wrapReverse align-center">
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/scientist.png" id="scientistImg" className="float" />
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "right" }} onSubmit={handleResetPasswordSubmitAr}>
                                                    <h2>تغيير كلمة السر</h2>
                                                    {wrongCredentials ? <p className="error">البريد الالكتروني غير مسجل</p> : ''}
                                                    <FormLabel htmlFor="email" className="ekseerForm-labelAr">البريد الالكتروني</FormLabel>
                                                    <FloatingLabel
                                                        label="البريد الالكتروني"
                                                        className="mb-3 ekseerFormInnerLabelAr"
                                                    >
                                                        <FormControl type="email" name="email" placeholder=">البريد الالكتروني" className="ekseerLabelAr" />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnRight">
                                                        استعادة كلمة المرور
                                                    </Button>
                                                </Form>
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
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ fontSize: '14px' }}>E-mail sent!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Kindly check your e-mail to reset your password, Thanks.</h5>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </Container>
        </>
    );
}

