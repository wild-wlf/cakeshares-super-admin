import React, { useState, useEffect } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import {
  StyledUploadFile,
  StyledBtn,
  FileUploadBox,
  FileInfo,
  FileSize,
  FileName,
  ProgressBarHolder,
  RemoveBtn,
} from "./UploadFile.styles";
import UploadImg from "../../../_assets/uploadFile.svg";
import Image from "next/image";
// import Toast from "../Toast";

const UploadFile = ({
  bg,
  onChange,
  disc = "File size must be less than 5MB in PDF, JPG, or PNG format.",
  title,
  uploadTitle = "Upload Image",
  label = true,
  fileSize = 2,
  accept = ".png , .jpg",
  type = "img",
  csv,
  icon,
  img = "",
  id = "upload",
  noMargin,
  ...props
}) => {
  const { CSVReader } = useCSVReader();
  const [uploaded, setUploaded] = useState("");
  function handelChange(e) {
    const file = e.target.files[0];
    if (file) {
      const fileLength = file.size / (1024 * 1024);
      if (fileLength <= fileSize) {
        setUploaded(e.target.files[0]);
        onChange({ target: { file } });
      } else {
        alert("file size exceeded");
      }
    }
  }
  const getFileExtension = () => {
    if (uploaded) {
      const fileNameParts = uploaded.name.split(".");
      if (fileNameParts.length > 1) {
        return fileNameParts[fileNameParts.length - 1];
      }
    }
    return "";
  };
  const getFileName = () => {
    if (uploaded) {
      const fileNameParts = uploaded.name.split(".");
      let fileName =
        fileNameParts.length > 1
          ? fileNameParts.slice(0, -1).join(".")
          : uploaded.name;

      // Truncate the file name if it's greater than 10 characters
      if (fileName.length > 20) {
        fileName = `${fileName.slice(0, 20)}...`;
      }

      return fileName;
    }
    return "";
  };

  useEffect(() => {
    if (img) {
      setUploaded(img);
    }
  }, [img]);

  return (
    <StyledUploadFile $bg={bg} $noMargin={noMargin}>
      {label && <span className="label-text">{title}</span>}
      {type === "img" && (
        <label htmlFor={id} className="labelButton">
          {!uploaded && (
            <span className="upload-text">
              <Image className="icon-img" src={UploadImg} alt="icon" />
              <span className="text-lg">{uploadTitle}</span>
              <span className="text">{disc}</span>
            </span>
          )}
          {uploaded && typeof uploaded === "string" ? (
            <Image src={uploaded} alt="img" width={250} height={300} />
          ) : (
            uploaded && (
              <Image
                src={URL.createObjectURL(uploaded)}
                alt="img"
                width={250}
                height={300}
              />
            )
          )}
        </label>
      )}
      {type === "file" && (
        <label htmlFor={id} className="labelButton">
          <span className="upload-text">
            <Image className="icon-img" src={UploadImg} alt="icon" />
            <span className="text-lg">{uploadTitle}</span>
            <span className="text">{disc}</span>
            {uploaded && (
              <span className="uploaded-file-name">
                {getFileName()}.{getFileExtension()}
              </span>
            )}
          </span>
        </label>
      )}
      <input
        type="file"
        id={id}
        accept={accept}
        onChange={(e) => handelChange(e)}
      />
      {type === "csv" && (
        <CSVReader
          // onUploadRejected={(file) => {
          //   Toast({
          //     type: `error`,
          //     message: file[0].errors[0].message || "invalid file formate",
          //   });
          // }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragLeave={(event) => {
            event.preventDefault();
          }}
          {...props}>
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }) => (
            <StyledBtn
              as="div"
              {...getRootProps()}
              css={`
                padding: 38px;
              `}
              className="labelButton">
              <div>
                {acceptedFile ? (
                  <FileUploadBox>
                    <FileInfo>
                      <FileSize>{formatFileSize(acceptedFile.size)}</FileSize>
                      <FileName>{acceptedFile.name}</FileName>
                    </FileInfo>
                    <ProgressBarHolder>
                      <ProgressBar />
                    </ProgressBarHolder>
                    <RemoveBtn
                      {...getRemoveFileProps()}
                      onMouseOver={(event) => {
                        event.preventDefault();
                      }}
                      onMouseOut={(event) => {
                        event.preventDefault();
                      }}>
                      <Remove />
                    </RemoveBtn>
                  </FileUploadBox>
                ) : (
                  <div className="upload-text">
                    {icon && (
                      <Image className="icon-img" src={UploadImg} alt="icon" />
                    )}
                    <span className="text-lg">{uploadTitle}</span>
                    <span className="text">{disc}</span>
                  </div>
                )}
              </div>
            </StyledBtn>
          )}
        </CSVReader>
      )}
    </StyledUploadFile>
  );
};

export default UploadFile;
