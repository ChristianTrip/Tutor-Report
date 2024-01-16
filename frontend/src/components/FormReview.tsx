import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {Option} from './form_elements/DropdownOptions';
import ReportCard from "./form_elements/ReportCard";

interface FormReviewProps {
    selectedDate: Date | null;
    semester:  Option | null;
    duration: Option | null;
    education: Option | null;
    problem: string;
    solution: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const FormReview: React.FC<FormReviewProps> = ({
                                                   selectedDate,
                                                   semester,
                                                   duration,
                                                   education,
                                                   problem,
                                                   solution,
                                                   onCancel,
                                                   onConfirm,
                                               }) => {
    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Review Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReportCard report={
                    {
                        date: selectedDate!,
                        semester: semester!.display,
                        education: education!.display,
                        duration: duration!.display,
                        problem: problem,
                        solution: solution,
                    }
                }
                showDate={true}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Annuller
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Indsend
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormReview;


