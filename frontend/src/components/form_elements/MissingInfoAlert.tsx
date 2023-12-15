import {Alert} from "react-bootstrap";
import React from "react";

interface AlertProps{
    errorMessage: string;
    answer: string;
    onClose: () => void;
}

export default function MissingInfoAlert({errorMessage, answer, onClose}: AlertProps){
    return (
        <Alert variant="danger" onClose={onClose} dismissible>
            <Alert.Heading>{errorMessage}</Alert.Heading>
            <p>
                {answer}
            </p>
        </Alert>
    )
}