import "./ConfirmModal.css";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete your account?</p>
        <p>This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="btn-1 btn-delete" onClick={onConfirm}>
            Yes, delete
          </button>
          <button className="btn-1 btn-alt-3" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
