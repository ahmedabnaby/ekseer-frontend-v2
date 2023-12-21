import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
}) {
  const { state } = useLocation();
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">

            {state?.user?.is_doctor ?
              <button
                className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl mt-3"
                onClick={(e) => {
                  setMeetingId(state?.meeting_id)
                  setIsJoinMeetingClicked(true);
                  onClickJoin(state?.meeting_id);
                }}
              >
                Join a meeting
              </button>
              :
              <button
                className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
                onClick={async (e) => {
                  const meetingId = await _handleOnCreateMeeting();
                  setMeetingId(meetingId);
                  setIscreateMeetingClicked(true);
                  if (iscreateMeetingClicked) {
                    if (videoTrack) {
                      videoTrack.stop();
                      setVideoTrack(null);
                    }
                    onClickStartMeeting();
                  } else {
                    if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                      onClickJoin(meetingId);
                    } else setMeetingIdError(true);
                  }
                }}
              >
                {state?.currentLanguage === "en" ? "Request a doctor" : "طلب طبيب"}
              </button>
            }

          </div>
        </div>
      )}
    </div>
  );
}
