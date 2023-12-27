import React from "react";
import { Container, Image, Card, CardBody } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

export const Home = () => {
    var { state } = useLocation();
    console.log(state)
    const nav = useNavigate();

    if (state === null) {
        state = {
            currentLanguage: "en",
            isLoggedIn: false,
            user: null
        }
    }

    const redirectLogin = () => {
        if (state === null || state.currentLanguage === "en") {
            nav("/login", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: false,
                    user: "patient",
                },
            });
        }
        else {
            nav("/login", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: false,
                    user: 'patient'
                }
            });
        }
    }

    const redirectQuestions = () => {
        if (state.currentLanguage === "en") {

            nav("/questions", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            });
        }
        else {
            nav("/questions", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            });
        }
    }

    const redirectCalls = () => {

        nav("/calls", {
            state: {
                currentLanguage: "en",
                isLoggedIn: true,
                user: state?.user,
                logInToken: state?.logInToken
            }
        });
    }

    return (
        <>
            {/* NOT LOGGED IN */}
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    {state?.currentLanguage === "en" ?
                        <>
                            {state?.isLoggedIn ? <h5 className="text-left" id="welcomeFullName" style={{ fontWeight: '600' }}>Welcome <span style={{ position: 'relative', left: '10px' }}>{state?.user.full_name}.</span></h5> : ""}

                            {/* HOME PAGE ENGLISH */}
                            <div className="homeLogo" id="logoLarger">
                                Medical Cloud <br /> <span id='homeCopyRights'>Company</span>  <span id="cpSpan">&#174;</span>
                            </div>
                            <p>Emergency consultant, anytime,  anywhere.</p>
                            <Card className="mt-2 mb-3 bg-dark-card">
                                <CardBody>
                                    <Image src="assets/images/2doctors.png" className="float" />
                                    {/* <CardTitle></CardTitle> */}
                                    {state?.isLoggedIn ?
                                        state?.user.is_doctor ?
                                            state?.user.is_verified ?
                                                (
                                                    <div className="btnPrimary" onClick={redirectCalls}>
                                                        Start Accepting Consultations
                                                    </div>
                                                )
                                                :
                                                (
                                                    <p className="mt-4">
                                                        <strong style={{fontSize:'1.5rem', fontStyle:'italic', color:'#3c3c3c', lineHeight:'12px'}}>We are currently reviewing your application,
                                                            once you're verified we will let you know so you can start accepting consultaions.
                                                        </strong>
                                                    </p>
                                                )
                                            :
                                            (
                                                <div className="btnPrimary" onClick={redirectQuestions}>
                                                    Request Emergency Consultation
                                                </div>
                                            )
                                        :
                                        <div className="btnPrimary" onClick={redirectLogin}>
                                            Request Emergency Consultation
                                        </div>
                                    }


                                </CardBody>
                            </Card>
                        </>
                        :
                        <>
                            {/* HOME PAGE ARABIIC */}
                            {state?.isLoggedIn ? <h5 className="text-right" id="welcomeFullName"><span style={{ position: 'relative', left: '10px' }}>{state?.user.full_name}&nbsp;</span>&nbsp; مرحبا </h5> : ""}
                            <div className="homeLogoAr">
                                شركة السحابة <br />  <span id="copyAr">&#174;</span> <span id='companyLogoAr'>الطبية</span>
                            </div>
                            <p className="mt-2">استشاري طب طوارئ في أي وقت<br /> .وأي مكان</p>
                            <Card className="mt-2 mb-3 bg-dark-card">
                                <CardBody>
                                    <Image src="assets/images/2doctors.png" className="float" />
                                    {/* <CardTitle></CardTitle> */}
                                    {state?.isLoggedIn ?
                                        <div className="btnPrimaryAr" onClick={redirectQuestions}>
                                            طلب استشارة طارئة
                                        </div> :
                                        <div className="btnPrimaryAr" onClick={redirectLogin}>
                                            طلب استشارة طارئة
                                        </div>
                                    }

                                </CardBody>
                            </Card>
                        </>
                    }

                </div>
            </Container>
        </>
    );
}

