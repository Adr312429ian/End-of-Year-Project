// script.js

const appointments = {};

function showOptions(dayElement, date) {
    if (confirm("Do you want to view appointments or book a new one? Click OK to view, Cancel to book.")) {
        showAppointments(date);
    } else {
        toggleForm(dayElement, date);
    }
}

function toggleForm(dayElement, date) {
    const formPopup = document.getElementById('form-popup');
    document.getElementById('appointmentDate').value = date;
    formPopup.style.display = 'block';
}

function closeForm() {
    const formPopup = document.getElementById('form-popup');
    formPopup.style.display = 'none';
}

document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;

    if (!appointments[date]) {
        appointments[date] = [];
    }

    appointments[date].push({ time, name });

    document.getElementById('appointmentForm').reset();
    closeForm();
    showAppointments(date);
});

function showAppointments(date) {
    const modal = document.getElementById('appointmentModal');
    const appointmentList = document.getElementById('appointmentList');
    const modalDate = document.getElementById('modalDate');

    modalDate.textContent = date;
    appointmentList.innerHTML = '';

    if (appointments[date]) {
        appointments[date].forEach(appointment => {
            const li = document.createElement('li');
            li.textContent = `${appointment.time} - ${appointment.name}`;
            appointmentList.appendChild(li);
        });
    }

    modal.style.display = 'block';
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('appointmentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}