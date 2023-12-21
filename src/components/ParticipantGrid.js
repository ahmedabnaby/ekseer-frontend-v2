import React, { useEffect, useState } from "react";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import { ParticipantView } from "./ParticipantView";
import { useLocation } from "react-router-dom";

const MemoizedParticipant = React.memo(
  ParticipantView,
  (prevProps, nextProps) => {
    return prevProps.participantId === nextProps.participantId;
  }
);

function ParticipantGrid({ participantIds, isPresenting }) {
  const { sideBarMode } = useMeetingAppContext();
  const { state } = useLocation();
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [isVisible, setIsVisible] = useState(false);
  const perRow =
    isMobile || isPresenting
      ? participantIds.length < 4
        ? 1
        : participantIds.length < 9
          ? 2
          : 3
      : participantIds.length < 5
        ? 2
        : participantIds.length < 7
          ? 3
          : participantIds.length < 9
            ? 4
            : participantIds.length < 10
              ? 3
              : participantIds.length < 11
                ? 4
                : 4;

  useEffect(() => {
    if (isVisible) {
      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);

      return () => clearInterval(countdownInterval); // Cleanup function for interval
    }
  }, [isVisible]); // Only run when visibility changes

  return (
    <div
      className={`flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${participantIds.length < 2 && !sideBarMode && !isPresenting
        ? "md:px-16 md:py-2"
        : participantIds.length < 3 && !sideBarMode && !isPresenting
          ? "md:px-16 md:py-8"
          : participantIds.length < 4 && !sideBarMode && !isPresenting
            ? "md:px-16 md:py-4"
            : participantIds.length > 4 && !sideBarMode && !isPresenting
              ? "md:px-14"
              : "md:px-0"
        }`}
    >
      {participantIds.length === 1 ?
        <div className="waitingScreen">
          {isVisible === false ? setIsVisible(true) : ""}
          <img src={process.env.PUBLIC_URL + "/assets/images/icons/timer.gif"} />
          <h1 style={{ color: 'white', textAlign:'center', marginTop:'25px' }}>Countdown: {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, "0")}</h1>
          <p style={{ color: 'white' }}>{state?.currentLanguage === "en" ? "Please wait while one of our consultants joins you." : "يرجى الانتظار حتى ينضم إليك أحد مستشارينا"}</p>
        </div>
        :
        <div className="flex flex-col w-full h-full">
          {Array.from(
            { length: Math.ceil(participantIds.length / perRow) },
            (_, i) => {
              return (
                <div
                  key={`participant-${i}`}
                  className={`flex flex-1 ${isPresenting
                    ? participantIds.length === 1
                      ? "justify-start items-start"
                      : "items-center justify-center"
                    : "items-center justify-center"
                    }`}
                >
                  {participantIds
                    .slice(i * perRow, (i + 1) * perRow)
                    .map((participantId) => {
                      return (
                        <div
                          key={`participant_${participantId}`}
                          className={`flex flex-1 ${isPresenting
                            ? participantIds.length === 1
                              ? "md:h-48 md:w-44 xl:w-52 xl:h-48 "
                              : participantIds.length === 2
                                ? "md:w-44 xl:w-56"
                                : "md:w-44 xl:w-48"
                            : "w-full"
                            } items-center justify-center h-full ${participantIds.length === 1
                              ? "md:max-w-7xl 2xl:max-w-[1480px] "
                              : "md:max-w-lg 2xl:max-w-2xl"
                            } overflow-clip overflow-hidden  p-1`}
                        >
                          <MemoizedParticipant participantId={participantId} />
                        </div>
                      );
                    })}
                </div>
              );
            }
          )}
        </div>
      }
    </div>
  );
}

export const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.participantIds) ===
      JSON.stringify(nextProps.participantIds) &&
      prevProps.isPresenting === nextProps.isPresenting
    );
  }
);
