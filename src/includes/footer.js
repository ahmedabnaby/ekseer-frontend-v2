import React from "react";
import { Container, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
    var { state } = useLocation();
    const nav = useNavigate();
    if (state === null) {
        state = {
            currentLanguage: "en",
        }
    }
    const navigateContact = () => {
        if (state?.currentLanguage === "en") {
            nav("contact-us", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
        else {
            nav("contact-us", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
    }
    return (
        <>
            <Container fluid className="footer text-center bg-color-primary">
                <div className={state?.currentLanguage === "en" ? "RowflexDirCol title" : "RowflexDirCol title-ar"}>
                    <div className="column">
                        {state?.currentLanguage === "en" ?
                            <div className="homeLogo" id="mediumFont">
                                Medical Cloud <br /> <h6 className='footerCompanyCopyRights'>Company<span>&#174;</span></h6>
                            </div>
                            :
                            <div className="homeLogoAr" id="mediumFont">
                                شركة السحابة <br />  <span id="copyAr">&#174;</span> <span id='companyLogoAr'>الطبية</span>
                            </div>
                        }
                    </div>
                    <div className="column bB">
                        {state?.currentLanguage === "en" ?
                            <>
                                <h4>
                                    Healthcare in your hands, <br /> wherever you are.
                                </h4>
                                <div className="btnDark" onClick={navigateContact}>
                                    Contact us
                                </div>
                            </>
                            :
                            <>
                                <h4>
                                    الرعاية الصحية بين يديك<br />أينما كنت
                                </h4>
                                <div className="btnDark-ar" onClick={navigateContact}>
                                    اتصل بنا
                                </div>

                            </>
                        }
                    </div>
                    <div className="column">
                        {state?.currentLanguage === "en" ?
                            <h5>
                                Copyright © All rights reserved.
                            </h5>
                            :
                            <h5>
                                .جميع الحقوق © محفوظة
                            </h5>
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}

