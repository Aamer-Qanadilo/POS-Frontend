import React from "react";

import { Box, Button, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import "./styles.css";
import { error } from "console";

type Props = {
  initialPreviewImage: string;
  error: boolean | undefined;
  helperText?: React.ReactNode;
  image: File | undefined;
  onImageChange: (file: File) => void;
  onBlur?: React.FocusEventHandler<HTMLLabelElement> | undefined;
  className?: string;
};

const FileField = ({
  image,
  error,
  helperText,
  initialPreviewImage,
  onImageChange,
  onBlur,
  className,
}: Props) => {
  const [previewImage, setPreviewImage] = React.useState<string>("");
  const [isDraggedIn, setIsDraggedIn] = React.useState(false);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    console.log(selectedFiles);
    onImageChange(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  const handleDragFile = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    console.log(event.dataTransfer.files);
    const selectedFiles = event.dataTransfer.files as FileList;

    onImageChange(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    toggleIsDraggedIn(event, false);
  };

  const toggleIsDraggedIn = (
    event: React.DragEvent<HTMLLabelElement>,
    newState: boolean,
  ) => {
    event.preventDefault();

    setIsDraggedIn(newState);
  };

  return (
    <Box component={"div"} sx={{ width: "100%", height: "100%" }}>
      <label
        htmlFor="file-input"
        className={
          "file-input" +
          (error && (!initialPreviewImage || previewImage)
            ? " file-input_error "
            : " ") +
          className
        }
        onDragOver={(evt) => toggleIsDraggedIn(evt, true)}
        onDragEnter={(evt) => toggleIsDraggedIn(evt, true)}
        onDragLeave={(evt) => toggleIsDraggedIn(evt, false)}
        onDrop={(e) => handleDragFile(e)}
        onBlur={onBlur}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={selectImage}
        />

        {(previewImage || initialPreviewImage) && !isDraggedIn ? (
          <>
            <div className="file-input__image">
              <img
                className="preview"
                src={previewImage || initialPreviewImage}
                alt=""
              />
            </div>
            <div
              className={
                "file-input__name" + (error ? " file-input__name_error" : "")
              }
            >
              {image?.name}
            </div>
          </>
        ) : (
          <>
            <FileUploadIcon fontSize="inherit" />
            <div className="file-input__placeholder">
              {isDraggedIn ? "Drop to upload" : "Browse or drop Image"}
            </div>
          </>
        )}
      </label>
      {error && (!initialPreviewImage || previewImage) && (
        <Typography variant="caption" className="file-input__error-message">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default FileField;
