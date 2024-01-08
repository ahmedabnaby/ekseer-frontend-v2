import React, { useState } from 'react';
import { Container, Form, Row, Col, Image, FormLabel, Button, Modal } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export const Questions = () => {

    const { state } = useLocation();

    const [show, setShow] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showFailedPayment, setShowFailedPayment] = useState(false);
    const handleClose = () => setShow(false);
    const handleClosePayment = () => setShowPayment(false);
    const handleCloseFailedPayment = () => setShowFailedPayment(false);

    const [isLoading, setIsLoading] = useState(false);

    const showPopup = () => {
        setShow(true);
    };
    const showHint1 = () => {
        var hint = document.querySelector("#popupHint1")
        hint.style.display = "block"
    };
    const hideHint1 = () => {
        var hint = document.querySelector("#popupHint1")
        hint.style.display = "none"
    };
    const showHint2 = () => {
        var hint = document.querySelector("#popupHint2")
        hint.style.display = "block"
    };
    const hideHint2 = () => {
        var hint = document.querySelector("#popupHint2")
        hint.style.display = "none"
    };
    const showHint3 = () => {
        var hint = document.querySelector("#popupHint3")
        hint.style.display = "block"
    };
    const hideHint3 = () => {
        var hint = document.querySelector("#popupHint3")
        hint.style.display = "none"
    };

    const goToPayment = async () => {
        setIsLoading(true);

        axios({
            method: "post",
            url: `https://backend.alsahaba.sa/api/initiate-payment/`

        })
            .then(function (response) {
                console.log(response)
                localStorage.setItem("myState", JSON.stringify(state));
                handleClosePayment();
                window.location.href = response.data.result.checkoutData.postUrl;
            })
            .catch(function (response) {
                setIsLoading(false);
                handleClosePayment();
                setShowFailedPayment(true);
                console.log(response);
            });
    }

    const handleQuestionsSubmit = (e) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const radioButtons = form.querySelectorAll('input[type="radio"]:checked');

        for (let i = 0; i < radioButtons.length; i++) {
            const radioButton = radioButtons[i];
            if (radioButton.value === "YES") {
                setShow(true)
                handleClosePayment();
                return;
            }
            else {
                setShowPayment(true)
            }
        }
        // console.log(e.target)
        // setShowPayment(true)

    }
    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {!isLoading &&
                            <>
                                {state?.currentLanguage === "en" ?
                                    <>
                                        {/* /QUESTION'S PAGE ENGLISH */}
                                        <Row>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleQuestionsSubmit}>
                                                    <div>
                                                        <h2 style={{ lineHeight: '28px' }}>Before <span id="cutomText2">&nbsp;you start the call with our consultants, You need to answer a few questions in order to escalate your condition.</span></h2>
                                                        <FormLabel htmlFor="yesOrNo1" className="questions-label">1) Are you less than 14 years old?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo1" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo1" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo2" className="questions-label">2) Are you physically outside of Riyadh City?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo2" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo2" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo3" className="questions-label">3) Do you feel you can’t maintain your airway breathing?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo3" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo3" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo4" className="questions-label">4) Are you complaining of severe difficult breathing?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo4" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo4" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo5" className="questions-label">5) Do you complain of Severe or continuous Bleeding?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo5" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo5" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo6" className="questions-label">
                                                            6) Do you complain of severe trauma?
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint1} onMouseLeave={hideHint1} />
                                                            <span id="popupHint1">
                                                                (e.g., falls from a horse or falls from height, multiple fractures, or others)
                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo6" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo6" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo7" className="questions-label">7) Have you been physically assaulted?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo7" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo7" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo8" className="questions-label">8) Have you been in a car or motorcycle accident or run over?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo8" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo8" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo9" className="questions-label">9) Is there loss or a low level of Consciousness at any time?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo9" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo9" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo10" className="questions-label">10) Are there any prohibited substances used?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo10" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo10" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo11" className="questions-label">11) Are you complaining of seizures at any time?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo11" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo11" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo12" className="questions-label">
                                                            12) Are you complaining of a symptom of stroke?
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint2} onMouseLeave={hideHint2} />
                                                            <span id="popupHint2">
                                                                (e.g.:<br />
                                                                o	Numbness or weakness of the face, arm, or leg, especially on one side of the body.<br />
                                                                o	Trouble with speaking and understanding.<br />
                                                                o	Trouble with seeing in one or both eyes.<br />
                                                                o	Trouble with walking, dizziness, and loss of balance.<br />
                                                                o	A sudden, severe headache, which may be accompanied by vomiting.)

                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo12" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo12" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo13" className="questions-label">13) Are you complaining of severe pain in any part of your body?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo13" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo13" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo14" className="questions-label">14) Are you complaining of chest pain?</FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo14" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo14" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo15" className="questions-label">
                                                            15) Are you complaining of psychological symptoms?
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint3} onMouseLeave={hideHint3} />
                                                            <span id="popupHint3">
                                                                (e.g.:<br />
                                                                o	Numbness or weakness of the face, arm, or leg, especially on one side of the body.<br />
                                                                o	Trouble with speaking and understanding.<br />
                                                                o	Trouble with seeing in one or both eyes.<br />
                                                                o	Trouble with walking, dizziness, and loss of balance.<br />
                                                                o	A sudden, severe headache, which may be accompanied by vomiting.)

                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4' id='d-flex'>
                                                            <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo15" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="No" id="no" name="yesOrNo15" defaultChecked />
                                                        </div>
                                                    </div>
                                                    {/* PAYMENT MODAL */}
                                                    <Modal show={showPayment} onHide={handleClosePayment}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>You are about to start a call with our consultants, this service costs <strong><span style={{ color: "#404242" }}> 50 SAR,</span></strong> do you wish to proceed?</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Row>
                                                                <Button type="submit" className="btnPrimary" onClick={goToPayment}>
                                                                    Yes
                                                                </Button>
                                                                <Button type="submit" className="btnPrimary" onClick={handleClosePayment}>
                                                                    No
                                                                </Button>
                                                            </Row>
                                                            <Image src="assets/images/call.png" className="mb-5 float" id='call' />
                                                        </Modal.Body>
                                                    </Modal>
                                                    {/* FAILED PAYMENT MODAL */}
                                                    <Modal show={showFailedPayment} onHide={handleCloseFailedPayment}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Something went wrong, do you wish to try again?</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Row>
                                                                <Button type="submit" className="btnPrimary" onClick={goToPayment}>
                                                                    Yes
                                                                </Button>
                                                                <Button type="submit" className="btnPrimary" onClick={handleCloseFailedPayment}>
                                                                    No
                                                                </Button>
                                                            </Row>
                                                            <Image src="assets/images/failed.png" className="mb-5 float" id='call' />
                                                        </Modal.Body>
                                                    </Modal>
                                                    {/* QUESTIONS MODAL */}
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>We apologize, currently, we cannot serve you, <strong><a href="#tel:997" style={{ color: "#404242" }}> Please call 997</a></strong> or go to nearest hospital.</Modal.Title>
                                                        </Modal.Header>
                                                        <Image src="assets/images/call.png" className="mb-5 float" id='call' />
                                                    </Modal>
                                                    <Button type="submit" className="btnPrimary btnLeft">
                                                        Request Consultation
                                                    </Button>
                                                </Form>
                                            </Col>
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/questions.png" className="float fixed-img" />
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    <>
                                        {/* /QUESTION'S PAGE ARABIIC */}
                                        <Row dir='rtl'>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm text-right" onSubmit={handleQuestionsSubmit}>
                                                    <div>
                                                        <h2>قبل أن تبدأ المكالمة مع مستشارينا، تحتاج إلى الإجابة على بعض الأسئلة من أجل تصعيد حالتك</h2>
                                                        <FormLabel htmlFor="yesOrNo1" className="questions-labelAr">١) هل عمرك اقل من ١٤ سنة؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo1" defaultValue="Yes" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo1" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo2" className="questions-labelAr">٢) هل أنت متواجد في مدينة الرياض؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo2" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo2" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo3" className="questions-labelAr">٣) هل هنالك شعور بانسداد مجرى التنفس أو عدم القدرة على التنفس في أي وقت؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo3" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo3" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo4" className="questions-labelAr">٤) هل هنالك صعوبة شديدة في التنفس؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo4" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo4" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo5" className="questions-labelAr">٥) هل هنالك نزيف دم فعال أو فقدان كمية دم كثيره؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo5" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo5" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo6" className="questions-labelAr">
                                                            ٦)هل هنالك إصابة شديدة ؟
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint1} onMouseLeave={hideHint1} />
                                                            <span id="popupHint1">
                                                                o	(مثال: وقوع من خيل أو أعراض كسور متعددة أو سقوط من مرتفع).
                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo6" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo6" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo7" className="questions-labelAr">٧) هل هنالك اعتداء جسدي؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo7" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo7" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo8" className="questions-labelAr">٨ ) هل هنالك تعرض لحادث سيارة أو دراجة نارية، أو دهس؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo8" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo8" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo9" className="questions-labelAr">٩ ) هل هنالك غياب أو انخفاض مستوى الوعي في أي وقت؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo9" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo9" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo10" className="questions-labelAr">١٠)هل هنالك تعاطي أي مواد ممنوعة؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo10" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo10" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo11" className="questions-labelAr">١١)هل هنالك نوبة تشنج/صرع في أي وقت؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo11" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo11" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo12" className="questions-labelAr">
                                                            ١٢) هل هنالك أعراض السكتة الدماغية؟
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint2} onMouseLeave={hideHint2} />
                                                            <span id="popupHint2">
                                                                مثال:
                                                                <br />
                                                                o	خدر أو ضعف في الوجه أو الذراع أو الساق، خاصة في جانب واحد من الجسم<br />
                                                                o	صعوبة في التحدث او الفهم<br />
                                                                o	صعوبة في الرؤية في كلا العينين أو احداهما<br />
                                                                o	صعوبة في المشي، والدوخة، وفقدان التوازن<br />
                                                                o	صداع شديد ومفاجئ وقد يصاحبه غثيان<br />


                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo12" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo12" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo13" className="questions-labelAr">١٣) هل هنالك ألم شديد جدا في أي مكان بالجسم؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo13" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo13" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo14" className="questions-labelAr">١٤) هل هنالك ألم في الصدر؟</FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo14" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo14" defaultChecked />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FormLabel htmlFor="yesOrNo15" className="questions-labelAr">
                                                            ١٥)	هل هنالك أي أعراض نفسية ؟
                                                            <Image src="assets/images/icons/info.png" onMouseEnter={showHint3} onMouseLeave={hideHint3} />
                                                            <span id="popupHint3">
                                                                o	مثال: <br />(هلوسة أو أوهام أو اضطراب في الفكر أو تغير في السلوك أو اكتئاب أو هوس أو التفكير بالانتحار أو إيذاء الاخرين وغيره).

                                                            </span>
                                                        </FormLabel>
                                                        <div className='d-flex mb-4 questions-labelAr' id='d-flex'>
                                                            <Form.Check type='radio' label="نعم" id="yes" name="yesOrNo15" defaultValue="YES" onChange={showPopup} />
                                                            <Form.Check type='radio' label="لا" id="no" name="yesOrNo15" defaultChecked />
                                                        </div>
                                                    </div>
                                                    {/* QUESTIONS MODAL ARABIC */}
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='colorBlackAr'>عفوا، نعتذر عن خدمتك حالياً، نرجو منك الاتصال على <strong><a href='#tel:977' style={{ color: "#404242" }}>٩٩٧</a></strong> لطلب المساعدة أو الذهاب لأقرب مستشفى</Modal.Title>
                                                        </Modal.Header>
                                                        <Image src="assets/images/call.png" className="mb-5 float" id='call' />
                                                    </Modal>
                                                    <Button type="submit" className="btnPrimary btnRight" style={{ position: 'relative', left: '10px' }}>
                                                        طلب استشارة
                                                    </Button>
                                                </Form>
                                            </Col>
                                            {/* PAYMENT MODAL ARABIC */}
                                            <Modal show={showPayment} onHide={handleClosePayment}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title className='colorBlackAr'>أنت على وشك بدء مكالمة مع مستشارينا، تكلفة هذه الخدمة  <strong><span style={{ color: "#7a7a7a" }}> 50 ريال سعودي</span></strong>  هل ترغب في المتابعة؟</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Button type="submit" className="btnPrimary colorBlackAr" onClick={handleClosePayment}>
                                                            لا
                                                        </Button>
                                                        <Button type="submit" className="btnPrimary colorBlackAr" onClick={goToPayment}>
                                                            نعم
                                                        </Button>
                                                    </Row>
                                                    <Image src="assets/images/call.png" className="mb-5 float" id='call' />
                                                </Modal.Body>
                                            </Modal>
                                            {/* FAILED PAYMENT MODAL */}
                                            <Modal show={showFailedPayment} onHide={handleCloseFailedPayment}>
                                                <Modal.Header closeButton dir='rtl'>
                                                    <Modal.Title className='colorBlackAr'>لقد حدث خطأ فني هل ترغب باعادة المحاولة؟</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Button type="submit" className="btnPrimary colorBlackAr" onClick={handleCloseFailedPayment}>
                                                            لا
                                                        </Button>
                                                        <Button type="submit" className="btnPrimary colorBlackAr" onClick={goToPayment}>
                                                            نعم
                                                        </Button>
                                                    </Row>
                                                    <Image src="assets/images/failed.png" className="mb-5 float" id='call' />
                                                </Modal.Body>
                                            </Modal>
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/questions.png" className="float fixed-img" />
                                            </Col>
                                        </Row>
                                    </>
                                }
                            </>
                        }
                        {isLoading &&
                            <div className='spinner'>
                                <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}

