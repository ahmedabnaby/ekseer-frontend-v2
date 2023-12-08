import React from "react";
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
    const { state } = useLocation();
    const nav = useNavigate();
    const redirectRegister = () => {
        if (state === null || state.currentLanguage === "en") {
            nav("/register", {
                state: {
                    currentLanguage: "en"
                }
            });
        }
        else {
            nav("/register", {
                state: {
                    currentLanguage: "ar"
                }
            });
        }
    }
    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {state?.currentLanguage === "en" ?
                            <>
                                {/* /LOGIN PAGE ENGLISH */}
                                <Row>
                                    <Col md={6} sm={12}>
                                        <Form className="ekseerForm" style={{ textAlign: "left" }}>
                                            <h2>Login <span id="cutomText">&nbsp;here</span></h2>
                                            <FormLabel htmlFor="iqama_number" className="ekseerForm-label">ID/Iqama number</FormLabel>
                                            <FloatingLabel
                                                controlId="floatingInput"
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
                                                    <p>New user? <span onClick={redirectRegister}>Register here.</span></p>
                                                </Col>
                                                <Col className="text-right">
                                                    <p><span>Forgot your password?</span></p>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/scientist.png" className="float"/>
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                                {/* /LOGIN PAGE ARABIIC */}
                                <Row className="wrapReverse">
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/scientist.png" id="scientistImg" className="float"/>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <Form className="ekseerForm" style={{ textAlign: "right" }}>
                                            <h2>تسجيل الدخول</h2>
                                            <FormLabel htmlFor="iqama_number" className="ekseerForm-labelAr">رقم الهوية/البطاقة</FormLabel>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="رقم الهوية/البطاقة"
                                                className="mb-3 ekseerFormInnerLabelAr"
                                            >
                                                <FormControl type="number" name="iqama_number" placeholder="Identification or Iqama number" className="ekseerLabelAr" />
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
                                                    <p><span>نسيت كلمة المرور؟</span></p>
                                                </Col>
                                                <Col>
                                                    <p>مستخدم جديد؟<span onClick={redirectRegister}>سجل هنا</span></p>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </>
                        }

                    </div>
                </div>
            </Container>
        </>
    );
}

