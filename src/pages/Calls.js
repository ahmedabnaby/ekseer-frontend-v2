import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Calls = () => {

    const { state } = useLocation();
    const nav = useNavigate();
    const BASE_URL = 'https://backend.alsahaba.sa/api';

    const [calls, setCalls] = useState([]);
    const [patients, setPatients] = useState([]);
    const [newCalls, setNewCalls] = useState(false);

    const fetchNewCalls = async () => {
        await axios.get(`${BASE_URL}/calls/`)
            .then((response) => {
                setCalls(response.data);
                var i = 0;
                while (i < response.data.length) {
                    console.log(getDateAndTime(response.data[i].created_at))
                    if (getDateAndTime(response.data[i].created_at) <= 60 && response.data[i].is_new) {
                        setNewCalls(true)
                        break;
                    }
                    else {
                        setNewCalls(false)
                    }
                    i++
                }
            })
    }
    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setPatients(response.data);
        })
    }

    const fetchCallsAndPatients = () => {
        fetchNewCalls()
        fetchPatients()
    }
    const getDateAndTime = (dateString) => {
        var today = new Date();
        var createdAt = new Date(dateString);
        const timeDifference = (today - createdAt) / 1000;
        const minutesPassed = Math.floor(timeDifference / 60);
        return minutesPassed
    }
    function getAge(birthDate) {
        const today = new Date();
        const birthDateObject = new Date(birthDate);
        const age = today.getFullYear() - birthDateObject.getFullYear();
        return age;
    }
    const handleAcceptCallClick = async (id, meeting_id) => {
        var bodyFormData = new FormData();
        var doctor_id = state?.user.id
        bodyFormData.append("meeting_id", meeting_id);
        bodyFormData.append("doctor_id", doctor_id);
        bodyFormData.append("is_new", false);
        bodyFormData.append("doctor_time", new Date().getMinutes());
        axios({
            method: "put",
            url: `${BASE_URL}/update-call/${id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                nav('/video-call', {
                    state: {
                        currentLanguage: "en",
                        isLoggedIn: true,
                        user: state?.user,
                        logInToken: state?.logInToken,
                        meeting_id: meeting_id,
                        patient_id: response.data.patient_id,
                        call_id: id,
                    }
                });
            })
            .catch(function (response) {
            });
    }
    useEffect(() => {
        fetchCallsAndPatients();
    }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchCallsAndPatients();
    //     }, 2000)
    //     return () => clearInterval(interval)
    // }, []);

    return (
        <>
            {console.log(newCalls)}
            <Container className="mt-5 h-75">
                <div className="title">
                    <h2 style={{ lineHeight: '28px' }}>
                        Calls
                    </h2>
                </div>
                <Row>
                    <Col md={6} sm={12}>
                        {newCalls &&
                            calls?.reverse().map((call) => (
                                <div key={call.id} >
                                    {call.is_new && getDateAndTime(call.created_at) <= 60 &&
                                        <div className="callsRow justify-content-between align-center d-flex">
                                            <div className="justify-content-between align-center d-flex">
                                                <div>
                                                    <h5>
                                                        <span>
                                                            {patients.map((patient) => (
                                                                call.patient_id === patient.id ?
                                                                    <div key={patient.id}>
                                                                        <span className="callFullName">{patient.full_name}</span>
                                                                        <br />
                                                                        <span style={{ fontSize: '12px', color: '#3c3c3c', position: "relative", top: '15px' }}>Age: {getAge(patient.date_of_birth)}</span>
                                                                    </div>
                                                                    :
                                                                    ""
                                                            ))}
                                                        </span>
                                                        <br />
                                                        <span style={{ position: 'relative', top: '5px' }}>
                                                            {getDateAndTime(call.created_at) >= 0 ? getDateAndTime(call.created_at) + " minute(s) ago" : "More than a hour ago"}
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <div className="btn-reply text-uppercase" onClick={() => handleAcceptCallClick(call.id, call.meeting_id)}>Accept Call</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        {!newCalls &&
                            <div>
                                <h5>No upcoming calls yet!</h5>
                            </div>
                        }
                    </Col>
                    <Col md={6} sm={12} className="scientistCol">
                        <Image src="assets/images/calls.png" className="float fixed-img" id="callsImg" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

