import React, { useEffect } from "react";
import { Container, Image, Card, CardBody } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

export const Home = () => {
    const { state } = useLocation();
    const nav = useNavigate();

    const refload = () => {
        if (state === null) {
            nav("/", {
                state: {
                    currentLanguage: "en",
                    user: {
                        user_is: "patient",
                        isLoggedIn: false
                    }
                },
            });
        }
    }

    const redirectLogin = () => {
            if(state === null || state.currentLanguage === "en"){
                nav("/login", {
                    state: {
                        currentLanguage: "en"
                    }
                });
            }
            else{
                nav("/login", {
                    state: {
                        currentLanguage: "ar"
                    }
                });
            }
    }

    useEffect(() => {
        refload()
    }, [])
    return (
        <>
            {/* NOT LOGGED IN */}
            {state?.isLoggedIn === undefined || (state?.user.isLoggedIn === false && state?.user.user_is === "patient") ?
                <Container className="mt-5">
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {state?.currentLanguage === "en" ?
                            <>
                                {/* HOME PAGE ENGLISH */}
                                <h1>ekseer <span>&#174;</span></h1>
                                <p>Emergency consultant, anytime,  anywhere.</p>
                                <Card className="mt-5 bg-dark-card">
                                    <CardBody>
                                        <Image src="assets/images/2doctors.png" className="float"/>
                                        {/* <CardTitle></CardTitle> */}
                                        <div className="btnPrimary" onClick={redirectLogin}>
                                            Request Emergency Consultation
                                        </div>
                                    </CardBody>
                                </Card>
                            </>
                            :
                            <>
                                {/* HOME PAGE ARABIIC */}
                                <Image src="/assets/images/arlogo-no-dark.png" />
                                <p className="mt-2">استشاري طب طوارئ في أي وقت<br /> .وأي مكان</p>
                                <Card className="mt-5 bg-dark-card">
                                    <CardBody>
                                        <Image src="assets/images/2doctors.png" className="float"/>
                                        {/* <CardTitle></CardTitle> */}
                                        <div className="btnPrimaryAr" onClick={redirectLogin}>
                                            طلب استشارة طارئة
                                        </div>
                                    </CardBody>
                                </Card>
                            </>
                        }

                    </div>
                </Container>
                :
                ""
            }
        </>
    );
}

