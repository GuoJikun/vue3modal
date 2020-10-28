import Modal from "./src/modal.vue";

Modal.install = (app: any): void => {
    app.component(Modal.name, Modal);
};

export default Modal;
