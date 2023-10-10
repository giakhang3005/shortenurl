export const useDownloadQr = () => {
  const download = (url, name) => {
    const a = document.createElement("a");
    //set name for download
    a.download = `QR_${name}.png`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return download;
};

