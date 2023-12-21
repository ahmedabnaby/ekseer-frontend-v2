import React from "react";
import { Container, Image } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

export const Footer = () => {
    var { state } = useLocation();
    if (state === null) {
        state = {
            currentLanguage: "en",
        }
    }
    return (
        <>
            <Container fluid className="footer text-center bg-color-primary">
                <div className={state?.currentLanguage === "en" ? "RowflexDirCol title" : "RowflexDirCol title-ar"}>
                    <div className="column">
                        {state?.currentLanguage === "en" ?
                            <h3>
                                ekseer <span>&#174;</span>
                            </h3>
                            :
                            <Image src="/assets/images/arlogo-no-dark.png" />
                        }
                    </div>
                    <div className="column">
                        {state?.currentLanguage === "en" ?
                            <>
                                <h4>
                                    Healthcare in your hands, <br /> wherever you are.
                                </h4>
                                <div className="btnDark">
                                    Contact us
                                </div>
                            </>
                            :
                            <>
                                <h4>
                                    الرعاية الصحية بين يديك<br />أينما كنت
                                </h4>
                                <div className="btnDark-ar">
                                    اتصل بنا
                                </div>

                            </>
                        }
                    </div>
                    <hr />
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

