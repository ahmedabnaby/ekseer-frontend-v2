import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';

export const Header = () => {
    const [lang, setLang] = useState("en");
    const [isExpanded, setIsExpanded] = useState(false);
    const animationRef = useRef(null);

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

    const nav = useNavigate();
    const changeLang = (language) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/", {
                state: {
                    currentLanguage: language,
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/", {
                state: {
                    currentLanguage: language,
                },
            });
        }
    }
    const redirectLogin = (language) => {
        setIsExpanded(false);
        if (language === "en") {
            setLang("en")
            setIsExpanded(false);
            nav("/login", {
                state: {
                    currentLanguage: language,
                },
            });
        }
        else {
            setLang("ar")
            setIsExpanded(false);
            nav("/login", {
                state: {
                    currentLanguage: language,
                },
            });
        }
    }
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
                            <div className='nav-link' onClick={() => changeLang("en")}>
                                <Image src="/assets/images/icons/home.png" />
                                Home
                            </div>
                            <div className='nav-link' onClick={() => redirectLogin("en")}>
                                <Image src="/assets/images/icons/customer.png" />
                                Register/Login
                            </div>
                            <div className='nav-link'>
                                <Image src="/assets/images/icons/id-card.png" />
                                About us
                            </div>
                            <div className='nav-link'>
                                <Image src="/assets/images/icons/customer-service.png" />
                                Contact us
                            </div>
                        </Nav>
                        <Nav>
                            <div className='nav-link'>
                                <Image src="/assets/images/icons/doctor.png" />
                                Doctors Portal
                            </div>
                            <div className='nav-link' id="ar" onClick={() => changeLang("ar")}>
                                العربية
                                <Image src="/assets/images/icons/saudi-arabia.png" />
                            </div>
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
                                <div className='nav-link' onClick={() => changeLang("ar")}>
                                    الصفحة الرئيسية
                                    <Image src="/assets/images/icons/home.png" />
                                </div>
                                <div className='nav-link' onClick={() => redirectLogin("ar")}>
                                    التسجيل/تسجيل الدخول
                                    <Image src="/assets/images/icons/customer.png" />
                                </div>
                                <div className='nav-link'>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                <div className='nav-link'>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
                                </div>
                            </Nav>
                            <Nav className='mt-3'>
                                <div className='nav-link'>
                                    بوابة الأطباء
                                    <Image src="/assets/images/icons/doctor.png" />
                                </div>
                                <div style={{ textAlign: 'left' }} className='nav-link' id="ar" onClick={() => changeLang("en")}>
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
                                <div className='nav-link' id="ar" onClick={() => changeLang("en")}>
                                    <Image src="/assets/images/icons/united-states.png" />
                                    <span style={{ color: "white" }}>EN</span>
                                </div>
                                <div className='nav-link'>
                                    بوابة الأطباء
                                    <Image src="/assets/images/icons/doctor.png" />
                                </div>
                            </Nav>
                            <Nav className="mx-auto" id='ar'>
                                <div className='nav-link'>
                                    اتصل بنا
                                    <Image src="/assets/images/icons/customer-service.png" />
                                </div>
                                <div className='nav-link'>
                                    من نحن
                                    <Image src="/assets/images/icons/id-card.png" />
                                </div>
                                <div className='nav-link' onClick={() => redirectLogin("ar")}>
                                    التسجيل/تسجيل الدخول
                                    <Image src="/assets/images/icons/customer.png" />
                                </div>
                                <div className='nav-link' onClick={() => changeLang("ar")}>
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