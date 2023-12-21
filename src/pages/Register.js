import React, { useState } from 'react';
import { Container, FloatingLabel, Form, Row, Col, Image, FormControl, FormLabel, FormSelect, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
    // const BASE_URL = 'https://ekseerv2.pythonanywhere.com/api';
    const BASE_URL = 'http://localhost:8000/api';
    const { state } = useLocation();
    console.log(state)
    const nav = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [emailErrors, setEmailErrors] = useState(false);
    const [fullNameErrors, setfullNameErrors] = useState(false);
    const [iqamaNumberErrors, setIqamaNumberErrors] = useState(false);
    const [copyOfIqamaNumberErrors, setCopyOfIqamaNumberErrors] = useState(false);
    const [copyOfscfhsErrors, setCopyOfscfhsErrors] = useState(false);
    const [personalPhotoErrors, setPersonalPhotoErrors] = useState(false);
    const [cvErrors, setCvErrors] = useState(false);
    const [mobileNumberErrors, setMobileNumberErrors] = useState(false);
    const [randomErrors, setrandomErrors] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const redirectLogin = (user) => {
        if (state === null || state.currentLanguage === "en") {
            nav("/login", {
                state: {
                    currentLanguage: "en",
                    user: user,
                    isLoggedIn: false
                }
            });
        }
        else {
            nav("/login", {
                state: {
                    currentLanguage: "ar",
                    user: user,
                    isLoggedIn: false
                }
            });
        }
    }
    const datePickerValidate = (e) => {
        console.log(e.target.value)
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 18) {
            setBirthDateError(true)
        } else {
            setBirthDateError(false)
        }
    }

    const handleRegisterSubmit = async (e) => {
        setIsLoading(true);
        // setShow(true);
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("full_name", e.target.full_name.value);
        bodyFormData.append("iqama_number", e.target.iqama_number.value);
        bodyFormData.append("password", e.target.password.value);
        bodyFormData.append("copy_of_iqama_number", e.target.copy_of_iqama.files[0]);
        bodyFormData.append("date_of_birth", e.target.birth_date.value);
        bodyFormData.append("mobile_number", e.target.mobile_number.value);
        bodyFormData.append("email", e.target.email.value);
        bodyFormData.append("nationality", e.target.nationality.value);
        if (state.user === "doctor") {
            bodyFormData.append("scfhs_registration", e.target.scfhs_number.value);
            bodyFormData.append("copy_of_scfhs_registration_card", e.target.scfhs_card.files[0]);
            bodyFormData.append("cv", e.target.cv.files[0]);
            bodyFormData.append("personal_photo", e.target.personal_photo.files[0]);
            bodyFormData.append("is_doctor", true);
        }
        axios({
            method: "post",
            url: `${BASE_URL}/register/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response)
                setIsLoading(false);
                setShow(true)
                var user = "patient";
                if (response.data.is_doctor) {
                    user = "doctor"
                }
                if (state === null || state.currentLanguage === "en") {
                    setTimeout(() => {
                        nav("/login", {
                            state: {
                                currentLanguage: "en",
                                user: user
                            }
                        });
                    }, 2000)
                }
                else {
                    setTimeout(() => {
                        nav("/login", {
                            state: {
                                currentLanguage: "ar",
                                user: user
                            }
                        });
                    }, 2000)
                }
            })
            .catch(function (response) {
                setIsLoading(false);
                console.log(response);
                if (response.response.data.full_name) {
                    setfullNameErrors(true)
                }
                if (response.response.data.email) {
                    setEmailErrors(true)
                }
                if (response.response.data.iqama_number) {
                    setIqamaNumberErrors(true)
                }
                if (response.response.data.mobile_number) {
                    setMobileNumberErrors(true)
                }
                if (response.response.data.copy_of_iqama_number) {
                    setCopyOfIqamaNumberErrors(true)
                }
                if (response.response.data.copy_of_scfhs_registration_card) {
                    setCopyOfscfhsErrors(true)
                }
                if (response.response.data.cv) {
                    setCvErrors(true)
                }
                if (response.response.data.personalPhotoErrors) {
                    setPersonalPhotoErrors(true)
                }
                else {
                    setrandomErrors(true)
                }
            });
    };
    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                        {!isLoading &&
                            <>
                                {state?.currentLanguage === "en" ?
                                    <>
                                        {/* /REGISTER PAGE ENGLISH */}
                                        <Row>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleRegisterSubmit}>
                                                    {state.user === "patient" ?
                                                        <h2>Register <span id="cutomText">&nbsp;here</span></h2>
                                                        :
                                                        <h2>Register <span id="cutomText">&nbsp;as doctor here</span></h2>}
                                                    {randomErrors ? <p className="error">Please try again!</p> : ''}
                                                    <FormLabel htmlFor="full_name" className="ekseerForm-label">Your Full Name</FormLabel>
                                                    {fullNameErrors ? <p className="error">Full name should contain only letters.</p> : ''}
                                                    <FloatingLabel
                                                        controlId="full_name"
                                                        label="Enter your full name"
                                                        className="mb-3 ekseerFormInnerLabel"
                                                    >
                                                        <FormControl type="text" name="full_name" placeholder="Enter your full name" required />
                                                    </FloatingLabel>
                                                    <FormLabel htmlFor="password" className="ekseerForm-label">Password</FormLabel>
                                                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 ekseerFormInnerLabel">
                                                        <FormControl type="password" name="password" placeholder="Password" required />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="iqama_number" className="ekseerForm-label">ID/Iqama number</FormLabel>
                                                            {iqamaNumberErrors ? <p className="error">IQAMA number must start with 1 or 2 and be 10 digits long or the IQAMA number already exists.</p> : ''}
                                                            <FloatingLabel
                                                                controlId="iqama_number"
                                                                label="ID/Iqama number"
                                                                className="mb-3 ekseerFormInnerLabel"
                                                            >
                                                                <FormControl type="number" name="iqama_number" placeholder="Identification or Iqama number" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="copy_of_iqama" className="ekseerForm-label">Copy of ID/Iqama</FormLabel>
                                                            {copyOfIqamaNumberErrors ? <p className="error">Only images are accepted! Please upload a valid image. The file you uploaded was either not an image or a corrupted image.</p> : ''}
                                                            <FormControl type="file" name="copy_of_iqama" placeholder="Identification or Iqama number" style={{ padding: '1rem .75rem', paddingLeft: '25px' }} required />
                                                        </Col>
                                                    </Row>
                                                    {state.user === "doctor" ?
                                                        <>
                                                            <Row>
                                                                <Col md={6} sm={12} className='mb-3'>
                                                                    <FormLabel htmlFor="scfhs_number" className="ekseerForm-label">SCFHS Registration #</FormLabel>
                                                                    <FloatingLabel
                                                                        controlId="scfhs_number"
                                                                        label="SCFHS Registration #"
                                                                        className="ekseerFormInnerLabel"
                                                                    >
                                                                        <FormControl type="text" name="scfhs_number" placeholder="SCFHS Registration #" required />
                                                                    </FloatingLabel>
                                                                </Col>
                                                                <Col md={6} sm={12} className='mb-3'>
                                                                    <FormLabel htmlFor="scfhs_card" className="ekseerForm-label">Copy of SCFHS Registration</FormLabel>
                                                                    {copyOfscfhsErrors ? <p className="error">Only images are accepted! Please upload a valid image. The file you uploaded was either not an image or a corrupted image.</p> : ''}
                                                                    <FormControl type="file" name="scfhs_card" placeholder="Copy of SCFHS Registration" style={{ padding: '1rem .75rem', paddingLeft: '25px' }} required />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={6} sm={6} style={{ width: '50%' }}>
                                                                    <FormLabel htmlFor="personal_photo" className="ekseerForm-label">Your Personal Photo</FormLabel>
                                                                    {personalPhotoErrors ? <p className="error">Only images are accepted! Please upload a valid image. The file you uploaded was either not an image or a corrupted image.</p> : ''}
                                                                    <FormControl type="file" name="personal_photo" placeholder="Your Personal Photo" style={{ padding: '1rem .75rem', paddingLeft: '25px' }} required />
                                                                </Col>
                                                                <Col md={6} sm={6} style={{ width: '50%' }}>
                                                                    <FormLabel htmlFor="cv" className="ekseerForm-label">CV</FormLabel>
                                                                    {cvErrors ? <p className="error">The file you uploaded was either not a file or corrupted.</p> : ''}
                                                                    <FormControl type="file" name="cv" placeholder="CV" style={{ padding: '1rem .75rem', paddingLeft: '25px' }} required />
                                                                </Col>
                                                            </Row>
                                                        </>
                                                        :
                                                        ""}
                                                    <FormLabel htmlFor="birth_date" className="ekseerForm-label">Your date of birth</FormLabel>
                                                    {birthDateError && <p className="error">Your Date of Birth indicates that you are below 18 years,
                                                        According to the Ministry of Health bylaws, your legal guardian must accompany you During the Tele-consultation!
                                                    </p>}
                                                    <FloatingLabel controlId="birth_date" label="Your date of birth" className="mb-3 ekseerFormInnerLabel">
                                                        <FormControl type="date" name="birth_date" placeholder="Your date of birth" onChange={datePickerValidate} required />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="mobile_number" className="ekseerForm-label">Mobile number</FormLabel>
                                                            {mobileNumberErrors ? <p className="error">The mobile number should start with '5' and to be '9' digits long.</p> : ''}
                                                            <FloatingLabel
                                                                controlId="mobile_number"
                                                                label="Ex: 5XXXXXXXX"
                                                                className="mb-3 ekseerFormInnerLabel"
                                                            >
                                                                <FormControl type="number" name="mobile_number" placeholder="Ex: 5XXXXXXXX" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="email" className="ekseerForm-label">Email address</FormLabel>
                                                            {emailErrors ? <p className="error">This E-mail address already exists.</p> : ''}
                                                            <FloatingLabel
                                                                controlId="email"
                                                                label="Email address"
                                                                className="mb-3 ekseerFormInnerLabel"
                                                            >
                                                                <FormControl type="email" name="email" placeholder="Email address" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <FormLabel htmlFor="nationality" className="ekseerForm-label">Nationality</FormLabel>
                                                    <FormSelect name="nationality" style={{ padding: '1rem .75rem' }} required>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AX">Åland Islands</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia, Plurinational State of</option>
                                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                        <option value="BA">Bosnia and Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BV">Bouvet Island</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos (Keeling) Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CG">Congo</option>
                                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="CI">Côte d'Ivoire</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CW">Curaçao</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="TF">French Southern Territories</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-Bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">Heard Island and McDonald Islands</option>
                                                        <option value="VA">Holy See (Vatican City State)</option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran, Islamic Republic of</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                                        <option value="KR">Korea, Republic of</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">Lao People's Democratic Republic</option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macao</option>
                                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia, Federated States of</option>
                                                        <option value="MD">Moldova, Republic of</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">Palestinian Territory, Occupied</option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="RE">Réunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russian Federation</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="BL">Saint Barthélemy</option>
                                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                        <option value="KN">Saint Kitts and Nevis</option>
                                                        <option value="LC">Saint Lucia</option>
                                                        <option value="MF">Saint Martin (French part)</option>
                                                        <option value="PM">Saint Pierre and Miquelon</option>
                                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                        <option value="SS">South Sudan</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SZ">Swaziland</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan, Province of China</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania, United Republic of</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TL">Timor-Leste</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">United States Minor Outlying Islands</option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                        <option value="VN">Viet Nam</option>
                                                        <option value="VG">Virgin Islands, British</option>
                                                        <option value="VI">Virgin Islands, U.S.</option>
                                                        <option value="WF">Wallis and Futuna</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
                                                    </FormSelect>
                                                    <div className="d-flex mt-2">
                                                        <div className="primary-checkbox">
                                                            <input type="checkbox" id="primary-checkbox" required />
                                                        </div>
                                                        <h5>By signing up you agree to our
                                                            <a href="/" target="_blank" style={{ color: "#8d8888" }}> Terms & Conditions</a>
                                                        </h5>
                                                    </div>
                                                    <Button type="submit" className="btnPrimary btnLeft">
                                                        Register
                                                    </Button>
                                                    {state.user === "patient" ?
                                                        <p className="forgetRegister">Already have account? <span onClick={() => redirectLogin("patient")}>Login here.</span></p>
                                                        :
                                                        <p className="forgetRegister">Already have account? <span onClick={() => redirectLogin("doctor")}>Login here.</span></p>
                                                    }
                                                </Form>
                                            </Col>
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/scientist2.png" className="float" />
                                            </Col>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Registration successful!</Modal.Title>
                                                </Modal.Header>
                                                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
                                            </Modal>
                                        </Row>
                                    </>
                                    :
                                    <>
                                        {/* /REGISTER PAGE ARABIIC */}
                                        <Row className="wrapReverse">
                                            <Col md={6} sm={12} className="scientistCol">
                                                <Image src="assets/images/scientist2.png" className="float" />
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <Form className="ekseerForm" style={{ textAlign: "right" }} onSubmit={handleRegisterSubmit}>
                                                    <h2>التسجيل</h2>
                                                    {randomErrors ? <p className="error">من فضلك حاول مرة اخرى</p> : ''}
                                                    <FormLabel htmlFor="full_name" className="ekseerForm-labelAr">الاسم الكامل</FormLabel>
                                                    {fullNameErrors ? <p className="errorAr">يجب أن يحتوي الاسم الكامل على أحرف فقط</p> : ''}
                                                    <FloatingLabel
                                                        controlId="full_name"
                                                        label="الاسم الكامل"
                                                        className="mb-3 ekseerFormInnerLabelAr"
                                                    >
                                                        <FormControl type="text" name="full_name" placeholder="الاسم الكامل" required />
                                                    </FloatingLabel>
                                                    <FormLabel htmlFor="password" className="ekseerForm-labelAr">الرقم السري</FormLabel>
                                                    <FloatingLabel controlId="password" label="الرقم السري" className="mb-3 ekseerFormInnerLabelAr">
                                                        <FormControl type="password" name="password" placeholder="الرقم السري" required />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="copy_of_iqama" className="ekseerForm-labelAr">صورة من الهوية/الإقامة</FormLabel>
                                                            {copyOfIqamaNumberErrors ? <p className="error">يتم قبول الصور فقط! يرجى تحميل صورة صالحة. الملف الذي قمت بتحميله لم يكن صورة أو صورة تالفة</p> : ''}
                                                            <FormControl type="file" name="copy_of_iqama" placeholder="صورة من الهوية/الإقامة<" style={{ padding: '1rem .75rem', paddingLeft: '25px' }} required />
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="iqama_number" className="ekseerForm-labelAr">رقم الهوية/البطاقة</FormLabel>
                                                            {iqamaNumberErrors ? <p className="errorAr">يجب أن يبدأ رقم الإقامة بالرقم 1 أو 2 وأن يتكون من 10 أرقام أو أن رقم الإقامة هذا موجود بالفعل</p> : ''}
                                                            <FloatingLabel
                                                                controlId="iqama_number"
                                                                label="رقم الهوية/البطاقة"
                                                                className="mb-3 ekseerFormInnerLabelAr ekseerFormInnerLabelAr-sm"
                                                            >
                                                                <FormControl type="number" name="iqama_number" placeholder="رقم الهوية/البطاقة" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <FormLabel htmlFor="birth_date" className="ekseerForm-labelAr">تاريخ الميلاد</FormLabel>
                                                    {birthDateError && <p className="error">يشير تاريخ ميلادك إلى أن عمرك أقل من 18 عامًا،
                                                        وفقاً للوائح وزارة الصحة، يجب أن يرافقك الوصي القانوني أثناء الاستشارة عن بعد
                                                    </p>}
                                                    <FloatingLabel controlId="birth_date" className="mb-3 ekseerFormInnerLabelAr">
                                                        <FormControl type="date" name="birth_date" placeholder="تاريخ الميلاد" onChange={datePickerValidate} required />
                                                    </FloatingLabel>
                                                    <Row>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="mobile_number" className="ekseerForm-labelAr">رقم الجوال</FormLabel>
                                                            {mobileNumberErrors ? <p className="errorAr">يجب أن يبدأ رقم الهاتف المحمول بـ "5" و يجب أن يكون مكون من 9 أرقام </p> : ''}
                                                            <FloatingLabel
                                                                controlId="mobile_number"
                                                                label="Ex: 5XXXXXXXX"
                                                                className="mb-3 ekseerFormInnerLabelAr ekseerFormInnerLabelAr-sm"
                                                            >
                                                                <FormControl type="number" name="mobile_number" placeholder="Ex: 5XXXXXXXX" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6} sm={6} style={{ width: '50%' }}>
                                                            <FormLabel htmlFor="email" className="ekseerForm-labelAr">البريد الالكتروني</FormLabel>
                                                            {emailErrors ? <p className="error">عنوان البريد الإلكتروني هذا موجود بالفعل</p> : ''}
                                                            <FloatingLabel
                                                                controlId="email"
                                                                label="البريد الالكتروني"
                                                                className="mb-3 ekseerFormInnerLabelAr ekseerFormInnerLabelAr-sm"
                                                            >
                                                                <FormControl type="email" name="email" placeholder="البريد الالكتروني" required />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <FormLabel htmlFor="nationality" className="ekseerForm-labelAr">الجنسية</FormLabel>
                                                    <FormSelect name="nationality" style={{ padding: '1rem .75rem' }} required>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AX">Åland Islands</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia, Plurinational State of</option>
                                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                        <option value="BA">Bosnia and Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BV">Bouvet Island</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos (Keeling) Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CG">Congo</option>
                                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="CI">Côte d'Ivoire</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CW">Curaçao</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="TF">French Southern Territories</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-Bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">Heard Island and McDonald Islands</option>
                                                        <option value="VA">Holy See (Vatican City State)</option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran, Islamic Republic of</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                                        <option value="KR">Korea, Republic of</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">Lao People's Democratic Republic</option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macao</option>
                                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia, Federated States of</option>
                                                        <option value="MD">Moldova, Republic of</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">Palestinian Territory, Occupied</option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="RE">Réunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russian Federation</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="BL">Saint Barthélemy</option>
                                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                        <option value="KN">Saint Kitts and Nevis</option>
                                                        <option value="LC">Saint Lucia</option>
                                                        <option value="MF">Saint Martin (French part)</option>
                                                        <option value="PM">Saint Pierre and Miquelon</option>
                                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                        <option value="SS">South Sudan</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SZ">Swaziland</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan, Province of China</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania, United Republic of</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TL">Timor-Leste</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">United States Minor Outlying Islands</option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                        <option value="VN">Viet Nam</option>
                                                        <option value="VG">Virgin Islands, British</option>
                                                        <option value="VI">Virgin Islands, U.S.</option>
                                                        <option value="WF">Wallis and Futuna</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
                                                    </FormSelect>
                                                    <div className="d-flex mt-2" dir="rtl">
                                                        <div className="primary-checkbox">
                                                            <input type="checkbox" id="primary-checkbox" required />
                                                        </div>
                                                        <h5>بالتسجيل معنا، فأنت توافق على
                                                            <a href="/" target="_blank" style={{ color: "#8d8888" }}>  الشروط والأحكام.</a>
                                                        </h5>
                                                    </div>
                                                    <Button type="submit" className="btnPrimary btnRight">
                                                        التسجيل
                                                    </Button>
                                                    <p className="forgetRegisterAr">هل لديك حساب مسجل؟<span onClick={() => redirectLogin("patient")}>تسجيل الدخول</span></p>
                                                </Form>
                                            </Col>
                                            <Modal show={show} onHide={handleClose} dir="rtl">
                                                <Modal.Header closeButton>
                                                    <Modal.Title className='colorBlackAr'>تم التسجيل بنجاح</Modal.Title>
                                                </Modal.Header>
                                                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
                                            </Modal>
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
            </Container >
        </>
    );
}

// const LoadingScreen = () => (
//     <div>Loading...</div>
// );