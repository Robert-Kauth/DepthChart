import { useState, useRef, ChangeEvent, MouseEvent } from "react";
import { useField, useFormikContext } from "formik";
import { Icon } from "@mdi/react";
import { mdiCloudUpload } from "@mdi/js";

import StyledError from "../StyledComponents/StyledError";
import type { FieldProps } from "./types";

import styles from "./Formik.module.css";

//! Need to debug and validate
export default function LiveAvatarUpload({
    label,
    helpText,
    ...props
}: FieldProps) {
    const fileUpload = useRef<HTMLInputElement>(null);

    const { setFieldError } = useFormikContext();
    const [field, meta] = useField<string>(props);

    const [didFocus, setDidFocus] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileURL, setFileURL] = useState<string | ArrayBuffer | null>();
    // console.log(fileName, "fileName");
    // console.log(fileURL, "fileURL");

    const supportedFormats = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    const handleFocus = () => setDidFocus(true);

    const showFeedback =
        (didFocus && field.value.trim().length > 2) || meta.touched;

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        fileUpload.current!.click();
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fr = new FileReader();
        const file = e.target.files![0];

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
                    `${fr.error!.name}: ${fr.error!.message}`
                );
        } else {
            setFieldError(props.name, "File type not supported");
        }
    };

    return (
        <div
            className={`${styles.formControl} ${
                showFeedback
                    ? meta.error
                        ? `${styles.invalid}`
                        : `${styles.valid}`
                    : ""
            }`}>
            <div className="flex items-center space-between">
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm">
                        {meta.error ? <StyledError error={meta.error} /> : "✓"}
                    </div>
                ) : null}
            </div>
            <label htmlFor={props.id}>{label}</label>
            {fileName && fileURL ? (
                <span>
                    <label htmlFor="customAvatar">{fileName}</label>
                    <img
                        id="customAvatar"
                        src={fileURL as string}
                        alt="Custom Avatar"
                    />
                </span>
            ) : null}
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                className={styles.textInput}
                {...props}
                {...field}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
                onChange={handleFile}
                ref={fileUpload}
            />
            <button className={styles.styledButton} onClick={handleClick}>
                <Icon className={styles.styledIcon} path={mdiCloudUpload} size={1} />
            </button>
            <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
                {helpText}
            </div>
        </div>
    );
}
