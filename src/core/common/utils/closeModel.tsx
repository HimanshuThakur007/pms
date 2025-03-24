export const closeModal = (modalRef: React.RefObject<HTMLDivElement>) => {
    if (modalRef.current) {
      const modalElement = modalRef.current;
  
      // Hide the modal
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
  
      // Hide the backdrop
      const backdropElement = document.querySelector('.offcanvas-backdrop');
      if (backdropElement) {
        backdropElement.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
  
      // Dispatch the hidden event for Bootstrap's modal
      const event = new Event('hidden.bs.modal');
      modalElement.dispatchEvent(event);
    }
  };
  