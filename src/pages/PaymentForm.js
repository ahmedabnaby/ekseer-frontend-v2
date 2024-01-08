import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const PaymentForm = () => {
  const nav = useNavigate();
  var { state } = useLocation();
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(true);

  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const paymentTypeValue = urlParams.get('orderId');



  const checkOrderStatus = async () => {
    setIsLoading(true);

    await axios({
      method: "GET",
      url: `https://backend.alsahaba.sa/api/get-order-payment/${paymentTypeValue}`
    })
      .then(function (response) {
        console.log(response)
        if (response.data.result.order.status === "CANCELLED" || response.data.result.order.status === "FAILED" || response.data.result.order.status === "REJECTED" || response.data.result.order.status === "EXPIRED") {
          setStatus(false)
          setIsLoading(false)
          setIsPaymentFailed(true)
          const timeoutId = setTimeout(() => {
            handleReturnToHomepage();
          }, 5000);
          return () => clearInterval(timeoutId);
        }
        else {
          setIsLoading(false)
          setIsPaymentFailed(false)
          setStatus(true)
          const timeoutId = setTimeout(() => {
            handleStartVideoCall();
          }, 5000);
          return () => clearInterval(timeoutId);
        }
      })
      .catch(function (response) {
        setIsLoading(false);
        console.log(response)
      });
  }

  var prevState = JSON.parse(localStorage.getItem("myState"))


  if (state === null) {
    state = prevState
  }

  const handleStartVideoCall = async () => {
    if (state?.currentLanguage === "en") {
      nav("/video-call", {
        state: {
          currentLanguage: "en",
          isLoggedIn: true,
          user: state?.user,
          logInToken: state?.logInToken
        }
      });
    }
    else {
      nav("/video-call", {
        state: {
          currentLanguage: "ar",
          isLoggedIn: true,
          user: state?.user,
          logInToken: state?.logInToken
        }
      });
    }
  }
  const handleReturnToHomepage = async () => {

    if (state?.currentLanguage === "en") {
      nav("/", {
        state: {
          currentLanguage: "en",
          isLoggedIn: true,
          user: state?.user,
          logInToken: state?.logInToken
        }
      });
    }
    else {
      nav("/", {
        state: {
          currentLanguage: "ar",
          isLoggedIn: true,
          user: state?.user,
          logInToken: state?.logInToken
        }
      });
    }
  }
  useEffect(() => {
    checkOrderStatus();
  }, []);
  return (
    <>
      {isLoading &&
        <>
          <div className='spinner'>
            <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
          </div>
        </>
      }
      {status && !isPaymentFailed && !isLoading &&
        <>

          <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
            {state?.currentLanguage === "en" ? <h2>We've received your payment, thank you!</h2> : <h2>تم الدفع بنجاح</h2>}
            <Image src='assets/images/payment-success.png' style={{ margin: '0px auto' }} className='float' />
          </div>
        </>
      }
      {isPaymentFailed && !isLoading && !status &&
        <>
          <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
            {state?.currentLanguage === "en" ? <h2>There's an error during the payment, please contact us to follow up this issue.</h2> : <h2>حدث خطأ أثناء الدفع، يرجى الاتصال بنا لمتابعة هذه المشكلة</h2>}
            <Image src='assets/images/icons/cancelled.png' style={{ margin: '0px auto' }} className='float' />
          </div>
        </>
      }
    </>
  );
};

