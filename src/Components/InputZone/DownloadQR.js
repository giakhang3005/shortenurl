import { useDownloadQr } from "../../Hooks/HooksController";

//download qr
export const DownloadQR = (shortenUrl) => {
  //decalre hooks
  const download = useDownloadQr();

  //split shorten url into 4 parts
  const shortUrl = shortenUrl.split("/");

  //get canvas
  const qr = document.querySelector("canvas");
  const qrCodeUrl = qr.toDataURL();

  download(qrCodeUrl, shortUrl[3]);
};
