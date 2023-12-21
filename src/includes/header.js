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
    console.log(state)

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

    useEffect(() => {
        setLang(state?.currentLanguage)
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-dark">
            {lang === "en" ?
                <Container>
                    <Navbar.Brand>
                        <div onClick={() => changeLang("en")}>
                            ekseer <span>&#174;</span>
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
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("en", "patient")}>
                                        <Image src="/assets/images/icons/profile-user.png" />
                                        Update profile
                                    </div>
                                </>
                                :
                                <div className='nav-link d-flex' onClick={() => redirectLogin("en", "patient")}>
                                    <Image src="/assets/images/icons/customer.png" />
                                    Register/Login
                                </div>
                            }
                            <div className='nav-link d-flex'>
                                <Image src="/assets/images/icons/id-card.png" />
                                About us
                            </div>
                            <div className='nav-link d-flex'>
                                <Image src="/assets/images/icons/customer-service.png" />
                                Contact us
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
                                        <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                            تحديث الملف
                                            <Image src="/assets/images/icons/profile-user.png" />
                                        </div>
                                    </>
                                    :
                                    <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                        التسجيل/تسجيل الدخول
                                        <Image src="/assets/images/icons/customer.png" />
                                    </div>
                                }
                                <div className='nav-link d-flex'>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                <div className='nav-link d-flex'>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
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
                            <Nav className="mx-auto" id='ar'>
                                {state?.isLoggedIn ?
                                    <div className='nav-link d-flex' onClick={() => redirectLogout("ar")}>
                                        تسجيل الخروج
                                        <Image src="/assets/images/icons/logout.png" />
                                    </div>
                                    :
                                    ""
                                }
                                <div className='nav-link d-flex'>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
                                </div>
                                <div className='nav-link d-flex'>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                {state?.isLoggedIn ?
                                    <>
                                        <div className='nav-link d-flex' onClick={() => redirectConsultation("ar")}>
                                            استشاراتي
                                            <Image src="/assets/images/icons/to-do-list.png" />
                                        </div>
                                        <div className='nav-link d-flex' onClick={() => redirectLogin("ar", "patient")}>
                                            تحديث الملف
                                            <Image src="/assets/images/icons/profile-user.png" />
                                        </div>
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
                        <div onClick={() => changeLang("ar")}>
                            <Image src="/assets/images/arlogo.png" />
                        </div>
                    </Navbar.Brand>
                </Container>

            }
        </Navbar>
    );
}

