import React, { useState, useRef } from "react";
import { useField, useFormikContext } from "formik";

import StyledError from "../StyledComponents/StyledError";

import styles from "./Formik.module.css";

//! Need to debug and validate
export default function LiveAvatarUpload({ label, helpText, ...props }) {
    const { setFieldError } = useFormikContext();
    const [field, meta] = useField(props);
    const fileUpload = useRef();

    const [didFocus, setDidFocus] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileURL, setFileURL] = useState("");
    // console.log(fileName, "fileName");
    // console.log(fileURL, "fileURL");
    const supportedFormats = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    const handleFocus = () => setDidFocus(true);

    console.log(field.value, "field value");

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    const handleFile = (e) => {
        e.preventDefault();
        const fr = new FileReader();
        const file = e.target.files[0];

        if (file && supportedFormats.includes(file.type)) {
            // Initiate read operation for file
            fr.readAsDataURL(file);

            //Fires when read is successfully completed
            fr.onload = () => {
                setFileName(file.name);
                setFileURL(fr.result);
            };
            //Fires if there is an error during read operation
            fr.onerror = () =>
                setFieldError(
                    props.name,
                    `${fr.error.name}: ${fr.error.message}`
                );
        } else {
            setFieldError(props.name, "File type not supported");
        }
    };

    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? "invalid" : "valid") : ""
            }`}>
            {!avatarSelection ? (
                <div>
                    <label htmlFor={props.id}>{label}</label>
                    <input
                        type="checkbox"
                        id={props.id}
                        name={props.id}
                        value={avatarSelection}
                        onChange={() => setAvatarSelection(!avatarSelection)}
                    />
                </div>
            ) : null}
            <div className="flex items-center space-between">
                {showFeedback && avatarSelection ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm">
                        {meta.error ? <StyledError error={meta.error} /> : "✓"}
                    </div>
                ) : null}
            </div>
            {avatarSelection ? (
                <>
                    <label htmlFor={props.id}>{label}</label>
                    {fileName && fileURL ? (
                        <span>
                            <label htmlFor="customAvatar">{fileName}</label>
                            <img
                                id="customAvatar"
                                src={fileURL}
                                alt="Custom Avatar"
                            />
                        </span>
                    ) : null}
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.textInput}
                        {...props}
                        {...field}
                        aria-describedby={`${props.id}-feedback ${props.id}-help`}
                        onFocus={handleFocus}
                        onChange={handleFile}
                        ref={fileUpload}
                    />
                    <div
                        className="text-xs"
                        id={`${props.id}-help`}
                        tabIndex="-1">
                        {helpText}
                    </div>
                </>
            ) : null}
        </div>
    );
}
