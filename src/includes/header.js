import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';

export const Header = () => {
    var { state } = useLocation();
    const nav = useNavigate();

    const [lang, setLang] = useState("en");
    const [isExpanded, setIsExpanded] = useState(false);
    const animationRef = useRef(null);

    if (state === null) {
        state = {
            currentLanguage: "en",
            isLoggedIn: false,
            user: null
        }
    }
    // console.log(state)

    const handleToggleClick = () => {
        setIsExpanded((prevState) => !prevState);

        if (animationRef.current) {
            animationRef.current.classList.toggle('show');
        }

        animationRef.current.addEventListener('transitionend', () => {
            if (!isExpanded) {
                animationRef.current.removeEventListener('transitionend', () => { });
            }
        });
    };

    const changeLang = (language) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: state?.isLoggedIn,
                    user: state.user,
                    logInToken: state?.logInToken
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: state?.isLoggedIn,
                    user: state.user,
                    logInToken: state?.logInToken
                },
            });
        }
    }
    const redirectLogin = (language, user) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/login", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: false,
                    user: user
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/login", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: false,
                    user: user
                },
            });
        }
    }
    const redirectLogout = (language) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/logout", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/logout", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                },
            });
        }
    }
    const redirectConsultation = (language) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/consultations", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/consultations", {
                state: {
                    currentLanguage: language,
                    isLoggedIn: true,
                    user: state?.user,
                    logInToken: state?.logInToken
                },
            });
        }
    }
    const navigateContact = () => {
        setIsExpanded(false);
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
    const navigateOurDoctors = () => {
        setIsExpanded(false);
        if (state?.currentLanguage === "en") {
            nav("our-doctors", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
        else {
            nav("our-doctors", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
    }
    const navigateAbout = () => {
        setIsExpanded(false);
        if (state?.currentLanguage === "en") {
            nav("about-us", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
        else {
            nav("about-us", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
    }
    const navigatePrivacyPolicy = () => {
        setIsExpanded(false);
        if (state?.currentLanguage === "en") {
            nav("privacy-policy", {
                state: {
                    currentLanguage: "en",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
        else {
            nav("privacy-policy", {
                state: {
                    currentLanguage: "ar",
                    isLoggedIn: state?.isLoggedIn ? true : false,
                    user: state?.user,
                    logInToken: state?.logInToken
                }
            })
        }
    }
    useEffect(() => {
        setLang(state?.currentLanguage)
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-dark">
            {lang === "en" ?
                <Container>
                    <Navbar.Brand>
                        <div onClick={() => changeLang("en")}>
                            Medical Cloud <br /> <span id='companyLogo'>Company</span>  <span>&#174;</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ position: 'relative', left: '10px' }} onClick={handleToggleClick} />
                    <Navbar.Collapse id="responsive-navbar-nav"
                        in={isExpanded} // Update the in prop based on the state
                        ref={animationRef} // Reference the .navbar-collapse element
                        className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} // Apply correct CSS classes
                        onTransitionEnd={() => {
                            if (!isExpanded) {
                                animationRef.current.removeEventListener('transitionend', () => { });
                            }
                        }}>
                        <Nav className="mx-auto">
                            <div className='nav-link d-flex' onClick={() => changeLang("en")}>
                                <Image src="/assets/images/icons/home.png" />
                                Home
                            </div>
                            {state?.isLoggedIn ?
                                <>
                                    <div className='nav-link d-flex' onClick={() => redirectConsultation("en")}>
                                        <Image src="/assets/images/icons/to-do-list.png" />
                                        My consultations
                                    </div>
                                    {/* <div className='nav-link d-flex' onClick={() => redirectLogin("en", "patient")}>
                                        <Image src="/assets/images/icons/profile-user.png" />
                                        Update profile
                                    </div> */}
                                </>
                                :
                                <div className='nav-link d-flex' onClick={() => redirectLogin("en", "patient")}>
                                    <Image src="/assets/images/icons/customer.png" />
                                    Register/Login
                                </div>
                            }
                            <div className='nav-link d-flex' onClick={navigateAbout}>
                                <Image src="/assets/images/icons/id-card.png" />
                                About us
                            </div>
                            <div className='nav-link d-flex' onClick={navigateOurDoctors}>
                                <Image src="/assets/images/icons/our-doctors.png" id='ourDoctorsImg' />
                                Our doctors
                            </div>
                            <div className='nav-link d-flex' onClick={navigateContact} >
                                <Image src="/assets/images/icons/customer-service.png" />
                                Contact us
                            </div>
                            <div className='nav-link d-flex' onClick={navigatePrivacyPolicy} >
                                <Image src="/assets/images/icons/privacy-policy.png" />
                                Privacy Policy
                            </div>
                            {state?.isLoggedIn ?
                                <div className='nav-link d-flex' onClick={() => redirectLogout("en")}>
                                    <Image src="/assets/images/icons/logout.png" />
                                    Logout
                                </div>
                                :
                                ""}
                        </Nav>
                        <Nav>

                            {state?.user?.is_doctor ?
                                ""
                                :
                                <>
                                    {state?.user?.is_doctor === false ?
                                        ""
                                        :
                                        <div className='nav-link d-flex' onClick={() => redirectLogin("en", "doctor")}>
                                            <Image src="/assets/images/icons/doctor.png" />
                                            Doctors Portal
                                        </div>
                                    }

                                    <div className='nav-link d-flex' id="ar" onClick={() => changeLang("ar")} style={{ flexDirection: "row-reverse", marginRight: '5px' }}>
                                        العربية
                                        <Image src="/assets/images/icons/saudi-arabia.png" />
                                    </div></>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                :
                <Container id='ar' className='pmobile'>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ position: 'relative', right: '10px', top: '15px' }} onClick={handleToggleClick} />
                    {isMobile ?
                        <Navbar.Collapse
                            id="responsive-navbar-nav"
                            style={{ position: 'relative', top: "15px" }}
                            in={isExpanded} // Update the in prop based on the state
                            ref={animationRef} // Reference the .navbar-collapse element
                            className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} // Apply correct CSS classes
                            onTransitionEnd={() => {
                                if (!isExpanded) {
                                    animationRef.current.removeEventListener('transitionend', () => { });
                                }
                            }}>
                            <Nav className="mx-auto mt-3" id='ar'>
                                <div className='nav-link d-flex' onClick={() => changeLang("ar")}>
                                    الصفحة الرئيسية
                                    <Image src="/assets/images/icons/home.png" />
                                </div>
                                {state?.isLoggedIn ?
                                    <>
                                        <div className='nav-link d-flex' onClick={() => redirectConsultation("ar")}>
                                            استشاراتي
                                            <Image src="/assets/images/icons/to-do-list.png" />
                                        </div>
                                        {/* <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                            تحديث الملف
                                            <Image src="/assets/images/icons/profile-user.png" />
                                        </div> */}
                                    </>
                                    :
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                        التسجيل/تسجيل الدخول
                                        <Image src="/assets/images/icons/customer.png" />
                                    </div>
                                }
                                <div className='nav-link d-flex' onClick={navigateOurDoctors}>
                                    أطباؤنا
                                    <Image src="/assets/images/icons/our-doctors.png" id="ourDoctorsImg" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigateAbout}>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigateContact}>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigatePrivacyPolicy}>
                                    سياسة الخصوصية
                                    <Image src="/assets/images/icons/privacy-policy.png" />
                                </div>
                                {state?.isLoggedIn ?
                                    <div className='nav-link d-flex' onClick={() => redirectLogout("ar")}>
                                        تسجيل الخروج
                                        <Image src="/assets/images/icons/logout.png" />
                                    </div>
                                    :
                                    ""
                                }
                            </Nav>
                            <Nav className='mt-3'>
                                {state?.user?.is_doctor === false ?
                                    ""
                                    :
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("en", "doctor")} style={{ justifyContent: 'flex-end' }}>
                                        بوابة الأطباء
                                        <Image src="/assets/images/icons/doctor.png" />
                                    </div>
                                }

                                <div style={{ textAlign: 'left' }} className='nav-link d-flex' id="ar" onClick={() => changeLang("en")}>
                                    <Image src="/assets/images/icons/united-states.png" />
                                    <span style={{ color: "white" }}>EN</span>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse
                            id="responsive-navbar-nav"
                            in={isExpanded} // Update the in prop based on the state
                            ref={animationRef} // Reference the .navbar-collapse element
                            className={`mt-4 collapse navbar-collapse ${isExpanded ? 'show' : ''}`} // Apply correct CSS classes
                            onTransitionEnd={() => {
                                if (!isExpanded) {
                                    animationRef.current.removeEventListener('transitionend', () => { });
                                }
                            }}
                            style={{ position: "relative", top: '2px' }}>
                            <Nav>
                                <div className='nav-link d-flex' id="ar" onClick={() => changeLang("en")}>
                                    <Image src="/assets/images/icons/united-states.png" />
                                    <span style={{ color: "white" }}>EN</span>
                                </div>
                                {state?.user?.is_doctor === false ?
                                    ""
                                    :
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("en", "doctor")}>
                                        بوابة الأطباء
                                        <Image src="/assets/images/icons/doctor.png" />
                                    </div>
                                }
                            </Nav>
                            <Nav className="mx-auto mxAr" id='ar'>
                                {state?.isLoggedIn ?
                                    <div className='nav-link d-flex' onClick={() => redirectLogout("ar")}>
                                        تسجيل الخروج
                                        <Image src="/assets/images/icons/logout.png" />
                                    </div>
                                    :
                                    ""
                                }
                                <div className='nav-link d-flex' onClick={navigatePrivacyPolicy}>
                                    سياسة الخصوصية
                                    <Image src="/assets/images/icons/privacy-policy.png" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigateContact}>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigateOurDoctors} >
                                    أطباؤنا
                                    <Image src="/assets/images/icons/our-doctors.png" />
                                </div>
                                <div className='nav-link d-flex' onClick={navigateAbout}>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                {state?.isLoggedIn ?
                                    <>
                                        <div className='nav-link d-flex' onClick={() => redirectConsultation("ar")}>
                                            استشاراتي
                                            <Image src="/assets/images/icons/to-do-list.png" />
                                        </div>
                                        {/* <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                            تحديث الملف
                                            <Image src="/assets/images/icons/profile-user.png" />
                                        </div> */}
                                    </>
                                    :
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                        التسجيل/تسجيل الدخول
                                        <Image src="/assets/images/icons/customer.png" />
                                    </div>
                                }
                                <div className='nav-link d-flex' onClick={() => changeLang("ar")}>
                                    الصفحة الرئيسية
                                    <Image src="/assets/images/icons/home.png" />
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    }
                    <Navbar.Brand id='ar-logo'>
                        <div onClick={() => changeLang("ar")} id='arLogo'>
                            شركة السحابة <br />  <span>&#174;</span> <span id='companyLogo'>الطبية</span>
                        </div>
                    </Navbar.Brand>
                </Container>

            }
        </Navbar>
    );
}

