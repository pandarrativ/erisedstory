import "./message-modal.css";

function MessageModal () {
    return ( 
        <dialog id="message_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg" id="message_modal_title">Title</h3>
                <p className="py-4" id="message_modal_content">Content</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
     );
}

export default MessageModal;