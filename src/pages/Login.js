import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    const BASE_URL = "https://backend.alsahaba.sa/api";

    const { state } = useLocation();
    console.log(state)
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const redirectRegister = (user) => {
        if (state === null || state.currentLanguage === "en") {
            nav("/register", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: false,
                    user: user
                }
            });
        }
        else {
            nav("/register", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: false,
                    user: user
                }
            });
        }
    }
    const redirectForgotPassword = (lang) => {
        if (state === null || state.currentLanguage === "en") {
            nav("/reset-password", {
                state: {
                    currentLanguage: lang,
                    isLoggedIn: false,
                    user: null
                }
            });
        }
        else {
            nav("/reset-password", {
                state: {
                    currentLanguage: lang,
                    isLoggedIn: false,
                    user: null
                }
            });
        }
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        var bodyFormData = new FormData();
        bodyFormData.append("iqama_number", e.target.iqama_number.value);
        bodyFormData.append("password", e.target.password.value);
        axios({
            method: "post",
            url: `${BASE_URL}/login/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setIsLoading(false);
                nav("/", {
                    state: {
                        currentLanguage: "en",
                        isLoggedIn: true,
                        user: response.data.user,
                        logInToken: response.data.token
                    }
                });
                console.log(response);
            })
            .catch(function (response) {
                setIsLoading(false);
                console.log(response);
                if (response.response.data.non_field_errors) {
                    setWrongCredentials(true)
                }
            });
    };
    const handleLoginSubmitAr = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        var bodyFormData = new FormData();
        bodyFormData.append("iqama_number", e.target.iqama_number.value);
        bodyFormData.append("password", e.target.password.value);
        axios({
            method: "post",
            url: `${BASE_URL}/login/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setIsLoading(false);
                nav("/", {
                    state: {
                        currentLanguage: "ar",
                        isLoggedIn: true,
                        user: response.data.user,
                        logInToken: response.data.token
                    }
                });
                console.log(response);
            })
            .catch(function (response) {
                setIsLoading(false);
                console.log(response);
                if (response.response.data.non_field_errors) {
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
                                                <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleLoginSubmit}>
                                                    {state.user === "patient" ?
                                                        <h2>Login <span id="cutomText">&nbsp;here</span></h2>
                                                        :
                                                        <h2>Login <span id="cutomText">&nbsp;as doctor here</span></h2>}
                                                    {wrongCredentials ? <p className="error">Wrong credentials! Please try again.</p> : ''}
                                                    <FormLabel htmlFor="iqama_number" className="ekseerForm-label">ID/Iqama number</FormLabel>
                                                    <FloatingLabel
                                                        label="ID/Iqama number"
                                                        className="mb-3 ekseerFormInnerLabel"
                                                    >
                                                        <FormControl type="number" name="iqama_number" placeholder="Identification or Iqama number" />
                                                    </FloatingLabel>
                                                    <FormLabel htmlFor="password" className="ekseerForm-label">Password</FormLabel>
                                                    <FloatingLabel controlId="floatingPassword" label="Password" className="ekseerFormInnerLabel">
                                                        <FormControl type="password" name="password" placeholder="Password" />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnLeft">
                                                        Login
                                                    </Button>
                                                    <Row className="forgetRegister">
                                                        <Col>
                                                            {state.user === "patient" ?

                                                                <p>New user? <span onClick={() => redirectRegister("patient")}>Register here.</span></p>
                                                                :
                                                                <p> <span onClick={() => redirectRegister("doctor")}>Register as doctor here.</span></p>
                                                            }
                                                        </Col>
                                                        <Col className="text-right">
                                                            <p><span onClick={()=>redirectForgotPassword("en")}>Forgot your password?</span></p>
                                                        </Col>
                                                    </Row>
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
                                                <Form className="ekseerForm" style={{ textAlign: "right" }} onSubmit={handleLoginSubmitAr}>
                                                    <h2>تسجيل الدخول</h2>
                                                    {wrongCredentials ? <p className="error">رقم الهوية/البطاقة او كلمة المرور خطأ</p> : ''}
                                                    <FormLabel htmlFor="iqama_number" className="ekseerForm-labelAr">رقم الهوية/البطاقة</FormLabel>
                                                    <FloatingLabel
                                                        controlId="floatingInput"
                                                        label="رقم الهوية/البطاقة"
                                                        className="mb-3 ekseerFormInnerLabelAr"
                                                    >
                                                        <FormControl type="number" name="iqama_number" placeholder="رقم الهوية/البطاقة" className="ekseerLabelAr" />
                                                    </FloatingLabel>
                                                    <FormLabel htmlFor="password" className="ekseerForm-labelAr">الرقم السري</FormLabel>
                                                    <FloatingLabel controlId="floatingPassword" label="الرقم السري" className="ekseerFormInnerLabelAr">
                                                        <FormControl type="password" name="password" placeholder="الرقم السري" className="ekseerLabelAr" />
                                                    </FloatingLabel>
                                                    <Button type="submit" className="btnPrimary btnRight">
                                                        تسجيل دخول
                                                    </Button>
                                                    <Row className="forgetRegisterAr">
                                                        <Col className="text-left">
                                                            <p><span onClick={()=>redirectForgotPassword("ar")}>نسيت كلمة المرور؟</span></p>
                                                        </Col>
                                                        <Col>
                                                            <p>مستخدم جديد؟<span onClick={() => redirectRegister("patient")}>سجل هنا</span></p>
                                                        </Col>
                                                    </Row>
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
                    </div>
                </div>
            </Container>
        </>
    );
}

