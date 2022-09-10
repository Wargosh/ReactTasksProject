import { Button, Modal } from "react-bootstrap";

type Props = {
    showModal: boolean;
    handleClose: () => void;
    confirmAction: () => void;
}

function ModalAlert({ showModal, handleClose, confirmAction }: Props) {
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ATENTION!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-content">
                    <h2>Are you sure you want to delete this note?</h2>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" type="button" onClick={confirmAction}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAlert