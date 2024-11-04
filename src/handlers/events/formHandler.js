let modalOverlay = document.getElementsByClassName('modal-overlay')[0];

function closeModal() {
    modalOverlay.className = 'hide';
}

function openForm() {
    modalOverlay.className = 'modal-overlay';
}