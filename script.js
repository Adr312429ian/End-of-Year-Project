function navigateToMonth(month) {
    window.location.href = month;
}

function showOptions(element, date) {
    const optionsPopup = document.getElementById('optionsPopup');
    const actionSelect = document.getElementById('actionSelect');
    actionSelect.value = '';
    optionsPopup.style.display = 'block';
    optionsPopup.dataset.date = date;
}

function closeOptions() {
    const optionsPopup = document.getElementById('optionsPopup');
    optionsPopup.style.display = 'none';
}

function performAction() {
    const actionSelect = document.getElementById('actionSelect');
    const selectedAction = actionSelect.value;
    const date = document.getElementById('optionsPopup').dataset.date;

    if (selectedAction === 'book') {
        openForm(date);
    } else if (selectedAction === 'view') {
        openAppointmentModal(date);
    }
    closeOptions();
}

function openForm(date) {
    document.getElementById('form-popup').style.display = 'block';
    document.getElementById('appointmentDate').value = date;
}

function closeForm() {
    document.getElementById('form-popup').style.display = 'none';
}

function openAppointmentModal(date) {
    const modal = document.getElementById('appointmentModal');
    const modalDate = document.getElementById('modalDate');
    const appointmentList = document.getElementById('appointmentList');

    modalDate.textContent = date;
    appointmentList.innerHTML = ''; // Clear existing appointments

    const appointments = JSON.parse(localStorage.getItem(date) || '[]');
    appointments.forEach(appointment => {
        const li = document.createElement('li');
        li.textContent = `${appointment.time} - ${appointment.name}`;
        appointmentList.appendChild(li);
    });

    modal.style.display = 'block';
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'none';
}

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;

    const appointments = JSON.parse(localStorage.getItem(date) || '[]');
    appointments.push({ time, name });
    localStorage.setItem(date, JSON.stringify(appointments));

    closeForm();
});
