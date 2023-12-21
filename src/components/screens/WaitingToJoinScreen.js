import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";

const WaitingToJoinScreen = () => {
  const waitingMessages = [
    { index: 0, text: " Joining..." },
    { index: 1, text: "Almost there..." },
  ];
  const [message, setMessage] = useState(waitingMessages[0]);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessage((s) =>
        s.index === waitingMessages.length - 1
          ? s
          : waitingMessages[s.index + 1]
      );
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const isTab = useIsTab();
  const isMobile = useIsMobile();


  return (
    <div
      className="bg-gray-800"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundColor: theme.palette.darkTheme.main,
      }}
    >
      <div className="flex flex-col">
        <div
          style={{
            height: isTab ? 200 : isMobile ? 200 : 250,
            width: isTab ? 200 : isMobile ? 200 : 250,
          }}
        >
          <img src="assets/images/icons/wait.png" className="float waitingImg"/>
        </div>
        <h1 className="text-white text-center font-bold mt-5 text-xl">
          {message.text}
        </h1>
      </div>
    </div>
  );
};

export default WaitingToJoinScreen;
