import {message} from 'antd'

//generate link
export const GenerateShortenLink = (generateUrl) => {
    //get input url & path
    const SelectedInput = document.querySelectorAll(".ant-input");
    const userInputUrl = SelectedInput[0].value;
    const userInputPath = SelectedInput[1].value;

    //check if user is using path or not
    //not using path
    let data = {
      domain: "shorten.giakhang3005.com",
      originalURL: userInputUrl,
      allowDuplicates: false,
    };
    if (userInputPath.length === 0) {
      //success
      generateUrl(data, userInputUrl);
      //using path, check for length
    } else if (userInputPath.length >= 5 && userInputPath.length <= 15) {
      data = {
        ...data,
        path: userInputPath,
      };
      //success
      generateUrl(data, userInputUrl);
    } else {
      message.error("Path must between 5 and 15 characters");
    }
  };