import React from 'react';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

export const OurDoctors = () => {

    const { state } = useLocation();

    return (
        <>
            <Container className="mt-5 pl-6">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {state?.currentLanguage === "en" ?
                            <>
                                {/* /ABOUT US PAGE ENGLISH */}
                                <Row>
                                    <Col md={6} sm={12}>
                                        <div className='ekseerForm text-left'>
                                            <h2 style={{ lineHeight: '28px' }}>Our<span id="cutomText2">&nbsp;doctors:</span></h2>
                                            <h4>Our medical team consists of consultant with significant experience and competency in emergency medicine specialty and have emergency medicine board with Professional Classification and Registration Record in Saudi Commission for Health Specialties.</h4>
                                        </div>
                                        <Table striped bordered hover className='ekseerForm text-left mb-5' style={{width:'95%', marginLeft:'5px'}}>
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>Dr. Hazem Al-Zahrani
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <Image src='assets/images/doctors/drhazem.png' id='drImg' />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Job Title</th>
                                                    <td>Emergency Medicine Consultant
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Specialty</th>
                                                    <td> Emergency Medicine
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>License Number</th>
                                                    <td>1400847033
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Registered Title and Number</th>
                                                    <td>Emergency Medicine Consultant
                                                        <br />
                                                        RM004092012
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Practical and Academic Experiences</th>
                                                    <td>Board Certified Emergency Medicine Consultant and Master in Health and Hospital Administration from King Saud University.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/about.png" className="float fixed-img" />
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                                {/* /ABOUT US PAGE ARABIIC */}
                                <Row className="wrapReverse">
                                    <Col md={6} sm={12} className="scientistCol">
                                        <Image src="assets/images/about.png" className="float fixed-img" />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div className='ekseerForm text-right'>
                                            <h2 id='bB'>أطباؤنا</h2>
                                            <h4>
                                                طاقمنا الطبي يتألف من استشاري ذو خبرة وكفاءة في تخصص طب طوارئ حاصلين على الزمالة في طب الطوارئ وتصنيف ممارسة المهنة من قبل الهيئة السعودية للتخصصات الصحية
                                            </h4>
                                        </div>
                                        <Table striped bordered hover dir='rtl' className='ekseerForm text-right mb-5' id='ar'>
                                            <tbody>
                                                <tr>
                                                    <th>الاسم</th>
                                                    <td>د. حازم الزهراني
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <Image src='assets/images/doctors/drhazem.png' id='drImgAr' />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>المسمى الوظيفي</th>
                                                    <td>استشاري طب طوارئ
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>التخصص</th>
                                                    <td> طب طوارئ
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>رقم الترخيص</th>
                                                    <td>1400847033
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>مسمى ورقم التصنيف</th>
                                                    <td>استشاري طب طوارئ
                                                        <br />
                                                        RM004092012
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>الخبرات العلمية والعملية</th>
                                                    <td>حاصل على شهادة البورد بتخصص طب الطوارئ وماجستير إدارة الصحة والمستشفيات من جامعة الملك سعود
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </>
                        }
                    </div>
                </div>
            </Container >
        </>
    )
}