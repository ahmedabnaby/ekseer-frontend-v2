import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

export const About = () => {

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
                                            <h2 style={{ lineHeight: '28px' }}>About<span id="cutomText2">&nbsp;the company:</span></h2>
                                            <h4>A Saudi Medical Company that is dedicated to remote healthcare and telemedicine with the aim of improving healthcare and facilitating accessibility to healthcare services and aiming to participate in accomplishing Vision 2030 healthcare objectives through using technology.</h4>
                                        </div>
                                        <div className='mt-3 ekseerForm text-left'>
                                            <h2 style={{ lineHeight: '28px' }}>Our<span id="cutomText2">&nbsp;address & how to contact us:</span></h2>
                                            <h4>
                                                Al Marwah District - Al Khaleel Bin Ahmad Street 3913<br />
                                                Postal Code: 14721<br />
                                                Riyadh - Kingdom of Saudi Arabia<br />

                                                <strong>You can contact us for inquiries, complaints, or suggestions using the contact form or WhatsApp on the website and also through the following email address. We will respond within 24 :hours</strong>
                                                <a href='mailto:info@alsahaba.sa' id='mailTo' target='_blank'> info@alsahaba.sa</a>
                                            </h4>
                                        </div>
                                        <div className='mt-3 ekseerForm text-left' >
                                            <h2 style={{ lineHeight: '28px' }}>Tele-Care<span id="cutomText2">&nbsp;and Emergency Communication Medicine Services:</span></h2>
                                            <ol>
                                                <li>Get an emergency medical consultation remotely.</li>
                                                <li>Raising awareness and educating the patient.</li>
                                                <li>Provide medical advice to the patient.</li>
                                                <li>Patient guidance for health institutions where appropriate treatment is available when necessary.</li>
                                                <li>Follow-up patients remotely based on information provided by the patient.</li>
                                                <li>Remote clinical assessment and reassessment of the treatment plan, in case the applicant needs to do so.</li>
                                                <li>Request medical examinations.</li>
                                                <li>Remote diagnosis of the condition.</li>
                                                <li>Evaluate the patient's condition.</li>
                                                <li>Issuance of sick leave.</li>
                                            </ol>
                                        </div>
                                        <div className='mt-3 ekseerForm text-left' >
                                            <h2 style={{ lineHeight: '28px' }}>Cases<span id="cutomText2">&nbsp;treated through the center:</span></h2>
                                            <h4>We handle all non-life-threatening
                                                emergencies that do not require
                                                immediate hospitalization,
                                                <strong> such as:</strong>
                                            </h4>

                                            <ul>
                                                <li>Fever</li>
                                                <li>Headache</li>
                                                <li>Fatigue and lethargy</li>
                                                <li>Cough</li>
                                                <li>Shortness of breath</li>
                                                <li>Nausea and Vomiting</li>
                                                <li>Abdominal Pain</li>
                                                <li>Diarrhea</li>
                                                <li>Constipation</li>
                                                <li>Infections</li>
                                                <li>Bone, muscle, or joint pain</li>
                                                <li>High blood pressure</li>
                                                <li>High Blood Sugar Level</li>
                                                <li>Common cold and influenza</li>
                                                <li>Allergy and Sensitivity</li>
                                                <li>Sinusitis</li>
                                                <li>Diseases of the urinary and reproductive system</li>
                                                <li>Others</li>
                                            </ul>
                                        </div>
                                        <div className='ekseerForm text-left'>
                                            <h2 style={{ lineHeight: '28px' }}>Working<span id="cutomText2">&nbsp;hours:</span></h2>
                                            <h4>Our working hours from 9am till 4pm from Sunday till Thursday.</h4>
                                        </div>
                                        <div className='ekseerForm text-left'>
                                            <h2 style={{ lineHeight: '28px' }}>Time takes<span id="cutomText2">&nbsp;to reply to patients:</span></h2>
                                            <h4>Our medical team is keen on replying to patient as soon as possible within 15 minutes and that depends on the number of patients served and the waiting time. </h4>
                                        </div>
                                        <div className='ekseerForm text-left'>
                                            <h2 style={{ lineHeight: '28px' }}>Services<span id="cutomText2">&nbsp;and payment methods:</span></h2>
                                            <h4>
                                                Telemedicine consultation
                                            </h4>
                                            <hr style={{ marginTop: '15px' }} />

                                            <h4 className='mt-3'>400 SAR for Tele-medicine consultation.

                                                Using electronic payment gateways.
                                            </h4>
                                        </div>
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
                                            <h2 id='bB'>نبذة عن الشركة</h2>
                                            <h4>
                                                هي شركة سعودية طبية تعنى بخدمات الرعاية الصحية عن بعد والطب الاتصالي
                                                وتهدف للارتقاء بالرعاية الصحية وتسهيل الوصول إلى الرعاية الصحية والسعي للمشاركة بتحقيق مستهدفات رؤية ٢٠٣٠ المعنية بالقطاع الصحي باستخدام التقنية

                                            </h4>
                                        </div>
                                        <div className='ekseerForm mt-5 text-right' id='formAr'>
                                            <h2 id='bB'>عنواننا وطريقة التواصل</h2>
                                            <h4>
                                                حي المروة - شارع الخليل بن أحمد ٣٩١٣
                                                <br />الرمز البريدي: ١٤٧٢١
                                                <br />الرياض – المملكة العربية السعودية<br /><br />

                                                يمكنكم التواصل معنا للاستفسار، الشكاوى أو الاقتراحات عن طريق نموذج التواصل أو الواتساب في الموقع وأيضاً من خلال البريد الالكتروني التالي، وسوف يتم الرد خلال ٢٤ ساعة
                                                <a href='mailto:info@alsahaba.sa' id='mailTo' target='_blank'> info@alsahaba.sa</a>
                                            </h4>
                                        </div>
                                        <div className='ekseerForm mt-5 text-right' id='formAr' dir='rtl'>
                                            <h2 id='bB'>الخدمات التي يقدمها مركز الرعاية عن بعد وطب الطوارئ الاتصالي</h2>
                                            <ol>
                                                <li>الحصول على استشارة طبية طارئة عن بعد</li>
                                                <li>توعية وتثقيف المريض</li>
                                                <li>تقديم النصيحة الطبية للمريض.</li>
                                                <li>توجيه المريض للمؤسسات الصحية التي يتوفر فيها العلاج المناسب عند اللزوم</li>
                                                <li>متابعة المرضى عن بعد بناء على المعلومات التي يتم توفيرها من قبل المريض</li>
                                                <li>التقييم السريري عن بعد وإعادة تقييم خطة العلاج، في حال احتاج طالب الخدمة لذلك</li>
                                                <li>طلب فحوصات طبية عن بعد</li>
                                                <li>تشخيص الحالة عن بعد</li>
                                                <li>تقييم حالة المريض</li>
                                                <li>إصدار الإجازة المرضية</li>
                                            </ol>
                                        </div>
                                        <div className='ekseerForm mt-5 text-right' dir='rtl'>
                                            <h2 id='bB'>نعالج جميع الحالات الطارئة التي لا تحتاج لنقل المريض للمستشفى بصفة عاجلة ، مثل</h2>
                                            <ul id='formAr'>
                                                <li>الحرارة</li>
                                                <li>الصداع</li>
                                                <li>الإعياء والخمول</li>
                                                <li>الكحة</li>
                                                <li>ضيق النفس</li>
                                                <li>الغثيان والاستفراغ</li>
                                                <li>آلام البطن</li>
                                                <li>الإسهال</li>
                                                <li>الإمساك</li>
                                                <li>الالتهابات</li>
                                                <li>آلام العظام أو العضلات أو المفاصل</li>
                                                <li>ارتفاع ضغط الدم</li>
                                                <li>ارتفاع مستوى السكر بالدم</li>
                                                <li>الرشح والزكام</li>
                                                <li>الحساسية</li>
                                                <li>التهاب الجيوب الأنفية</li>
                                                <li>أمراض الجهاز البولي والتناسلي</li>
                                                <li>و غيره</li>
                                            </ul>
                                        </div>
                                        <div className='ekseerForm mt-5 text-right'>
                                            <h2 id='bB'>أوقات العمل</h2>
                                            <h4>
                                                أوقات العمل من الساعة التاسعة صباحا وحتى الرابعة عصرا من الأحد إلى الخميس
                                            </h4>
                                        </div>
                                        <div className='ekseerForm mt-5 text-right'>
                                            <h2 id='bB'>الوقت المستغرق للرد على المريض</h2>
                                            <h4>
                                                طاقمنا الطبي حريص للرد على المريض بأسرع وقت ممكن حوالي 15 دقيقة ويعتمد على عدد المرضى الذين سيتم خدمتهم ووقت الانتظار
                                            </h4>
                                        </div>
                                        <div className='ekseerForm mt-5 mb-5 text-right'>
                                            <h2 id='bB'>أسعار الخدمات المقدمة وطرق الدفع</h2>
                                            <h4>
                                                استشارة طبية عن بعد
                                                <hr style={{ marginTop: '15px' }} />
                                            </h4>
                                            <h4 className='mt-2'>

                                                ٤٠٠ ريال سعودي قيمة الاستشارة الطبية عن بعد

                                                ويتم الدفع عن طريق بوابة الدفع الالكترونية المعتمدة

                                            </h4>
                                        </div>
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