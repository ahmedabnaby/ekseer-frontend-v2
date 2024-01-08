import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ConfirmForgotPassword = () => {
    const BASE_URL = "https://backend.alsahaba.sa/api";

    var { state } = useLocation();
    state = {
        currentLanguage: "en",
        isLoggedIn: false,
        user: null,
    }
    let { token } = useParams();
    console.log(token)
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
        bodyFormData.append("password", e.target.password.value);
        bodyFormData.append("token", token);
        axios({
            method: "post",
            url: `${BASE_URL}/password_reset/confirm/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setIsLoading(false);
                setShow(true)
                nav("/", {
                    state: {
                        currentLanguage: "en",
                        isLoggedIn: false,
                        user: null,
                    },
                });
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
                                {/* /LOGIN PAGE ENGLISH */}
                                <Row>
                                    <Col md={6} sm={12}>
                                        <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleResetPasswordSubmit}>
                                            <h2>Reset <span id="cutomText">&nbsp; your password</span></h2>
                                            {wrongCredentials ? <p className="error">Something went wrong.</p> : ''}
                                            <FormLabel htmlFor="password" className="ekseerForm-label">Enter your new password</FormLabel>
                                            <FloatingLabel
                                                label="Enter your new password"
                                                className="mb-3 ekseerFormInnerLabel"
                                            >
                                                <FormControl type="password" name="password" placeholder="Enter your new password" />
                                            </FloatingLabel>
                                            <Button type="submit" className="btnPrimary btnLeft">
                                                Reset password
                                            </Button>
                                        </Form>
                                    </Col>
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src={process.env.PUBLIC_URL + "/assets/images/scientist.png"} className="float" />
                                    </Col>
                                </Row>
                            </>
                        }
                        {isLoading &&
                            <div className='spinner'>
                                <Image src={process.env.PUBLIC_URL + "/assets/images/icons/clock.gif"} className="mb-5 float" id='clockSpinner' />
                            </div>
                        }
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ fontSize: '14px' }}>Done!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Your password has been changed, you can now log in with your new password,<br /> Thanks.</h5>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </Container>
        </>
    );
}

