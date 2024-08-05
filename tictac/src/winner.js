// WinnerModal.js
import React from "react";
import "./button.css";

const WinnerModal = ({ winner, onClose }) => {
	if (!winner) return null;

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={onClose}>
					&times;
				</span>
				<h2>{winner} wins! 🎉</h2>
			</div>
		</div>
	);
};

export default WinnerModal;
