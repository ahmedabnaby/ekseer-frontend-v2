import React, { useState, useEffect, useRef, createRef } from "react";
import { Constants, useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { BottomBar } from "./components/BottomBar";
import { SidebarConatiner } from "../components/sidebar/SidebarContainer";
import MemorizedParticipantView from "./components/ParticipantView";
import { PresenterView } from "../components/PresenterView";
import { nameTructed, trimSnackBarText } from "../utils/helper";
import WaitingToJoinScreen from "../components/screens/WaitingToJoinScreen";
import ConfirmBox from "../components/ConfirmBox";
import useIsMobile from "../hooks/useIsMobile";
import useIsTab from "../hooks/useIsTab";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import useMediaStream from "../hooks/useMediaStream";
import { useLocation } from "react-router-dom";
import { Container, FloatingLabel, Form, Image, FormControl, FormLabel, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export function MeetingContainer({
  onMeetingLeave,
  setIsMeetingLeft,
  selectedMic,
  selectedWebcam,
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
  micEnabled,
  webcamEnabled,
}) {
  const BASE_URL = 'http://127.0.0.1:8000/api';
  const { useRaisedHandParticipants } = useMeetingAppContext();
  const { getVideoTrack } = useMediaStream();
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShow(false);
  const [patients, setPatients] = useState([])
  const [medication, setMedication] = useState(false)
  const [sickLeave, setSickLeave] = useState(false)

  const bottomBarHeight = 60;

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] =
    useState(null);
  const [meetingErrorVisible, setMeetingErrorVisible] = useState(false);
  const [meetingError, setMeetingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mMeetingRef = useRef();
  const containerRef = createRef();
  const containerHeightRef = useRef();
  const containerWidthRef = useRef();

  useEffect(() => {
    containerHeightRef.current = containerHeight;
    containerWidthRef.current = containerWidth;
  }, [containerHeight, containerWidth]);

  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const sideBarContainerWidth = isXLDesktop
    ? 400
    : isLGDesktop
      ? 360
      : isTab
        ? 320
        : isMobile
          ? 280
          : 240;

  useEffect(() => {
    containerRef.current?.offsetHeight &&
      setContainerHeight(containerRef.current.offsetHeight);
    containerRef.current?.offsetWidth &&
      setContainerWidth(containerRef.current.offsetWidth);

    window.addEventListener("resize", ({ target }) => {
      containerRef.current?.offsetHeight &&
        setContainerHeight(containerRef.current.offsetHeight);
      containerRef.current?.offsetWidth &&
        setContainerWidth(containerRef.current.offsetWidth);
    });
  }, [containerRef]);

  const { participantRaisedHand } = useRaisedHandParticipants();

  const _handleMeetingLeft = () => {
    setIsMeetingLeft(true);
  };

  const _handleOnRecordingStateChanged = ({ status }) => {
    if (
      status === Constants.recordingEvents.RECORDING_STARTED ||
      status === Constants.recordingEvents.RECORDING_STOPPED
    ) {
      toast(
        `${status === Constants.recordingEvents.RECORDING_STARTED
          ? "Meeting recording is started"
          : "Meeting recording is stopped."
        }`,
        {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
}

  function onParticipantJoined(participant) {
    // Change quality to low, med or high based on resolution
    participant && participant.setQuality("high");
  }

  function onEntryResponded(participantId, name) {
    // console.log(" onEntryResponded", participantId, name);
    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (name === "allowed") {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        setTimeout(() => {
          _handleMeetingLeft();
        }, 3000);
      }
    }
  }

  async function onMeetingJoined() {
    // console.log("onMeetingJoined");
    const { changeWebcam, changeMic, muteMic, disableWebcam } =
      mMeetingRef.current;

    if (webcamEnabled && selectedWebcam.id) {
      await new Promise((resolve) => {
        let track;
        disableWebcam();
        setTimeout(async () => {
          track = await getVideoTrack({
            webcamId: selectedWebcam.id,
            encoderConfig: "h540p_w960p",
          });
          changeWebcam(track);
          resolve();
        }, 500);
      });
    }

    if (micEnabled && selectedMic.id) {
      await new Promise((resolve) => {
        muteMic();
        setTimeout(() => {
          changeMic(selectedMic.id);
          resolve();
        }, 500);
      });
    }
  }
  function onMeetingLeft() {
    // console.log("onMeetingLeft");
    onMeetingLeave();
  }

  const _handleOnError = (data) => {
    const { code, message } = data;

    const joiningErrCodes = [
      4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010,
    ];

    const isJoiningError = joiningErrCodes.findIndex((c) => c === code) !== -1;
    const isCriticalError = `${code}`.startsWith("500");

    new Audio(
      isCriticalError
        ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
        : `https://static.videosdk.live/prebuilt/notification_err.mp3`
    ).play();

    setMeetingErrorVisible(true);
    setMeetingError({
      code,
      message: isJoiningError ? "Unable to join meeting!" : message,
    });
  };

  const mMeeting = useMeeting({
    onParticipantJoined,
    onEntryResponded,
    onMeetingJoined,
    onMeetingLeft,
    onError: _handleOnError,
    onRecordingStateChanged: _handleOnRecordingStateChanged,
  });

  const isPresenting = mMeeting.presenterId ? true : false;

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  usePubSub("RAISE_HAND", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName } = data;

      const isLocal = senderId === localParticipantId;

      new Audio(
        `https://static.videosdk.live/prebuilt/notification.mp3`
      ).play();

      toast(`${isLocal ? "You" : nameTructed(senderName, 15)} raised hand 🖐🏼`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      participantRaisedHand(senderId);
    },
  });

  usePubSub("CHAT", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName, message } = data;

      const isLocal = senderId === localParticipantId;

      if (!isLocal) {
        new Audio(
          `https://static.videosdk.live/prebuilt/notification.mp3`
        ).play();

        toast(
          `${trimSnackBarText(
            `${nameTructed(senderName, 15)} says: ${message}`
          )}`,
          {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    },
  });

  const medic = (e) => {
    if (e.target.value === "YES") {
      setMedication(true)
    } else {
      setMedication(false)
    }
  }
  const sick = (e) => {
    if (e.target.value === "YES") {
      setSickLeave(true)
    } else {
      setSickLeave(false)
    }
  }

  const fetchPatients = async () => {
    await axios.get(`${BASE_URL}/users/`).then((response) => {
      setPatients(response.data);
    })
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    var bodyFormData = new FormData();
    var doctor_id = state?.user?.id
    bodyFormData.append("doctor_id", doctor_id);
    bodyFormData.append("patient_id", state?.patient_id);
    bodyFormData.append("chief_complaint", e.target.chief_complaint.value);
    bodyFormData.append("history_of_illness", e.target.history_of_illness.value);
    bodyFormData.append("review_of_systems", e.target.review_of_systems.value);
    bodyFormData.append("examination", e.target.examination.value);
    bodyFormData.append("assessment", e.target.assessment.value);
    bodyFormData.append("call_id", state?.call_id);
    if (e.target.medication === undefined) {
      bodyFormData.append("medication", "No");
    }
    else {
      bodyFormData.append("medication", e.target.medication.value);
    }
    if (e.target.sick_leave === undefined) {
      bodyFormData.append("sick_leave", 0);
    }
    else {
      bodyFormData.append("sick_leave", e.target.sick_leave.value);
    }
    await axios({
      method: "post",
      url: `${BASE_URL}/create-consultation/`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setIsLoading(false)
        setShowSuccessModal(true)
        setShow(false)
        setTimeout(() => {
          setShowSuccessModal(false)
          handleClose();
      }, 2000)
      })
      .catch(function (response) {
        setIsLoading(false)
        handleClose();
        console.log(response);
      });
  }
  useEffect(() => {
    fetchPatients();
  }, [])

  return (
    <div className="fixed inset-0">
      <div ref={containerRef} className="h-full flex flex-col bg-gray-800">
        {typeof localParticipantAllowedJoin === "boolean" ? (
          localParticipantAllowedJoin ? (
            <>
              {state?.user?.is_doctor ?
                <div className="btnPrimary" onClick={setShow}>Write consultation</div>
                : ""
              }
              <Modal show={show} onHide={handleClose} id="consultationModal">
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h3 style={{ color: '#0f0f17' }}>
                      You are writing consultation to:
                      <span style={{ color: "#3c3c3c", fontSize: '18px' }}>
                        {patients.map((patient) => (
                          state?.patient_id === patient.id ?
                            <div key={patient.id}>
                              Patient name: <strong>{patient.full_name}</strong>
                              <br />
                              Age: <strong>{new Date().getFullYear() - patient.date_of_birth.slice(6)}</strong>
                            </div>
                            :
                            ""
                        ))}
                      </span>
                    </h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="ekseerForm" style={{ textAlign: "left" }} onSubmit={handleSubmit}>
                    <div className="row">
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">Chief Complaint:</Form.Label>
                        <Form.Control as="textarea" rows={3} name='chief_complaint' placeholder="Chief Complaint ..." required />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">History of Presenting Illness:</Form.Label>
                        <Form.Control as="textarea" rows={3} name='history_of_illness' placeholder="History of Presenting Illness ..." required />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">Review of Systems:</Form.Label>
                        <Form.Control as="textarea" rows={3} name='review_of_systems' placeholder="Review of Systems ..." required />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">Examination:</Form.Label>
                        <Form.Control as="textarea" rows={3} name='examination' placeholder="Examination ..." required />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">Assessment/Plan:</Form.Label>
                        <Form.Control as="textarea" rows={3} name='assessment' placeholder="Assessment/Plan ..." required />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="ekseerForm-label">Prescribe Medication</Form.Label>
                        <div className='d-flex mb-4' id='d-flex'>
                          <Form.Check type='radio' label="Yes" id="yes" name="yesOrNo" defaultValue="YES" onChange={medic} />
                          <Form.Check type='radio' label="No" id="no" name="yesOrNo" defaultChecked onChange={medic} />
                        </div>
                        {medication &&
                          <>
                            <Form.Control as="textarea" rows={3} className="mb-3" id='medic' name='medication' placeholder="Write the full prescription medications ..." required />
                            <Container>
                              <h5 style={{ marginBottom: '10px' }}>We can help you order medics from here, choose your OS and download
                                <span style={{ color: "#24ab94" }}> Anat App </span>now!</h5>
                              <div className="d-flex">
                                <div>
                                  <a href='https://play.google.com/store/apps/details?id=com.lean.practitioner' target='_blank' rel="noreferrer">
                                    <img src={process.env.PUBLIC_URL + '/assets/images/icons/google-play.png'} style={{ width: '45px' }} />
                                  </a>
                                </div>
                                <div>
                                  <a href='https://apps.apple.com/sa/app/anat-%D8%A3%D9%86%D8%A7%D8%A9/id1472911277' target='_blank' rel="noreferrer">
                                    <img src={process.env.PUBLIC_URL + '/assets/images/icons/app-store.png'} style={{ width: '35px', position: 'relative', top: '5px', left: '25px' }} />
                                  </a>
                                </div>
                              </div>
                            </Container>
                          </>
                        }
                      </Form.Group>
                      <Form.Group>
                        <FormLabel htmlFor="sick_leave" className="ekseerForm-label">Prescribe Sick-leave</FormLabel>
                        <div className='d-flex mb-4' id='d-flex'>
                          <Form.Check type='radio' label="Yes" id="yes1" name="yesOrNo1" defaultValue="YES" onChange={sick} />
                          <Form.Check type='radio' label="No" id="no1" name="yesOrNo1" defaultChecked onChange={sick} />
                        </div>
                        {sickLeave &&
                          <FloatingLabel
                            label="How many days?"
                            className="mb-3 ekseerFormInnerLabel"
                          >
                            <FormControl id='sick' name='sick_leave' type='number' placeholder="How many days?" required />
                          </FloatingLabel>
                        }
                      </Form.Group>
                      <div className="col-xl-12">
                        <Button type="submit" className="btnPrimary btnLeft">
                          Save consultation
                        </Button>
                      </div>
                    </div>

                  </Form>
                </Modal.Body>
              </Modal>
              {isLoading &&
                <div className='spinner'>
                  <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
                </div>
              }
              <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Consultation created successfully!</Modal.Title>
                </Modal.Header>
                <Image src="assets/images/success.png" className="mb-5 float" id='call' />
              </Modal>
              <div className={` flex flex-1 flex-row bg-gray-800 `}>
                <div className={`flex flex-1 `}>
                  {isPresenting ? (
                    <PresenterView height={containerHeight - bottomBarHeight} />
                  ) : null}
                  {isPresenting && isMobile ? null : (
                    <MemorizedParticipantView isPresenting={isPresenting} />
                  )}
                </div>

                <SidebarConatiner
                  height={containerHeight - bottomBarHeight}
                  sideBarContainerWidth={sideBarContainerWidth}
                />
              </div>

              <BottomBar
                bottomBarHeight={bottomBarHeight}
                setIsMeetingLeft={setIsMeetingLeft}
                selectWebcamDeviceId={selectWebcamDeviceId}
                setSelectWebcamDeviceId={setSelectWebcamDeviceId}
                selectMicDeviceId={selectMicDeviceId}
                setSelectMicDeviceId={setSelectMicDeviceId}
              />
            </>
          ) : (
            <></>
          )
        ) : (
          !mMeeting.isMeetingJoined && <WaitingToJoinScreen />
        )}
        <ConfirmBox
          open={meetingErrorVisible}
          successText="OKAY"
          onSuccess={() => {
            setMeetingErrorVisible(false);
          }}
          title={`Error Code: ${meetingError.code}`}
          subTitle={meetingError.message}
        />
      </div>
    </div>
  );
}
