import { useDownloadQr } from "../../Hooks/HooksController";
import { Popover, QRCode } from "antd";

//! Handle QR Download action & show QR 
export const HandleDownloadQr = ({url}) => {

  const download = useDownloadQr();

  const getPath = (url) => {
    const splitUrl = url.split("/");

    return splitUrl[3];
  };
  //download qrcode
  const downloadQrCode = (path) => {
    //get canvas
    const qr = document.querySelector(`.qr_${path} canvas`);
    const qrCodeUrl = qr.toDataURL();

    download(qrCodeUrl, path);
  };

  return (
    <Popover content="Click to download">
      <a
        onClick={() => downloadQrCode(getPath(url.short))}
        className="qrDownload"
      >
        <QRCode
          className={`qr_${getPath(url.short)}`}
          size={68}
          bordered
          style={Object.assign({ margin: "0 7px 0 0" })}
          type="canvas"
          value={url.short}
        />
      </a>
    </Popover>
  );
};
