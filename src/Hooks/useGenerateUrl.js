import { useState } from "react";
import { message } from "antd";

//generate a shorten url
export const useGenerateUrl = () => {
  const [shortenUrl, setShortenUrl] = useState("");
  const [loading, setLoading] = useState(false);

  //check if input is a url
  const checkUrl = (string) => {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  };

  //generate URL
  const generateUrl = (data, userInputUrl) => {
    setShortenUrl("");
    //Notice if user not input a url
    if (checkUrl(userInputUrl) === false) {
      message.error("You must enter a url to shorten");
      setShortenUrl("");
    } else {
      //start fetching
      setLoading(true);
      fetch("https://api.short.io/links/public", {
        method: "post",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "pk_cYj2a160rvwjosKP",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //check for errors
          if (data.success === false) {
            setLoading(false);
            setShortenUrl("");
            message.error(
              "Path aldready exist, please change to a new one or leave it empty for a random path"
            );
          } else {
            //success
            setLoading(false);
            message.success("Generate shorten Url successfully");

            //return to users
            setShortenUrl(data.shortURL);

            //save to localStorage
            const userHistory = JSON.parse(localStorage.getItem("userHistory"));
            //save to localStorage
            if (userHistory === null || userHistory === undefined) {
              localStorage.setItem(
                "userHistory",
                JSON.stringify([{ long: userInputUrl, short: data.shortURL }])
              );
            } else {
              localStorage.setItem(
                "userHistory",
                JSON.stringify([
                  ...userHistory,
                  { long: userInputUrl, short: data.shortURL },
                ])
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return { shortenUrl, loading, generateUrl };
};
