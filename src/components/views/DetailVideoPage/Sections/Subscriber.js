import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../../url";
function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState("");
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post(`${url}/subscribe/subscribeNumber`, subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribe.length);
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    axios
      .post(`${url}/subscribe/subscribed`, subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  }, [userTo]);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (Subscribed) {
      //when we are already subscribed
      axios
        .post(`${url}/subscribe/unSubscribe`, subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to unsubscribe");
          }
        });
    } else {
      // when we are not subscribed yet

      axios
        .post(`${url}/subscribe/subscribe`, subscribeVariables)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to subscribe");
          }
        });
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscriber;
