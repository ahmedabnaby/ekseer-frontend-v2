import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const PaymentForm = () => {
  const nav = useNavigate();
  var { state } = useLocation();
  const [hasRun, setHasRun] = useState(false);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const paymentTypeValue = urlParams.get('orderId');



  const checkOrderStatus = async () => {
    setIsLoading(true);

    await axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/get-order-payment/${paymentTypeValue}`
    })
      .then(function (response) {
        if (response.data.result.order.status === "CANCELLED" || response.data.result.order.status === "FAILED" || response.data.result.order.status === "REJECTED" || response.data.result.order.status === "EXPIRED") {
          console.log(response);
        }
        else {
          setStatus(true)
        }
      })
      .catch(function (response) {
        setIsLoading(false);
        handleReturnToHomepage()
      });
  }

  var prevState = JSON.parse(localStorage.getItem("myState"))


  if (state === null) {
    state = prevState
  }
  console.log(state)

  const handleStartVideoCall = () => {
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
  const handleReturnToHomepage = () => {
    setIsLoading(true);

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
    console.log(status)
    checkOrderStatus();
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      // Your function to be executed after 2 seconds
      if (status) {
        handleStartVideoCall();
        setHasRun(true); // Optional: Mark the function as run
      }
      else {
        handleReturnToHomepage();
      }
    }, 5000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run only once
  return (
    <Container>
      {!isLoading &&
        <>
          {status ?
            <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
              {state?.currentLanguage === "en" ? <h2>We've received your payment, thank you!</h2> : <h2>تم الدفع بنجاح</h2>}
              <Image src='assets/images/payment-success.png' style={{ margin: '0px auto' }} className='float' />
            </div>
            :
            <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
              {state?.currentLanguage === "en" ? <h2>There's an error during the payment, please contact us to follow up this issue.</h2> : <h2>حدث خطأ أثناء الدفع، يرجى الاتصال بنا لمتابعة هذه المشكلة</h2>}
              <Image src='assets/images/icons/cancelled.png' style={{ margin: '0px auto' }} className='float' />
            </div>
          }
        </>
      }
      {isLoading &&
        <>
          <div className='spinner' id='transparentSpinner'>
            <Image src="assets/images/icons/clock.gif" className="mb-5 float" id='clockSpinner' />
          </div>
          {status ?
            <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
              {state?.currentLanguage === "en" ? <h2>We've received your payment, thank you!</h2> : <h2>تم الدفع بنجاح</h2>}
              <Image src='assets/images/payment-success.png' style={{ margin: '0px auto' }} className='float' />
            </div>
            :
            <div className={state?.currentLanguage === "en" ? "successPayment" : "successPaymentAr"}>
              {state?.currentLanguage === "en" ? <h2>There's an error during the payment, please contact us to follow up this issue.</h2> : <h2>حدث خطأ أثناء الدفع، يرجى الاتصال بنا لمتابعة هذه المشكلة</h2>}
              <Image src='assets/images/icons/cancelled.png' style={{ margin: '0px auto' }} className='float' />
            </div>
          }
        </>
      }
    </Container>
  );
};

