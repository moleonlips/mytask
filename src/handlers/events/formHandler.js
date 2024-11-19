let modalOverlay = document.getElementsByClassName('modal-overlay')[0];

function closeModal() {
    modalOverlay.className = 'hide';
}

function openForm() {
    modalOverlay.className = 'modal-overlay';
}

// Color selection
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        // Add selected class to clicked option
        option.classList.add('selected');
    });
});

document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const taskData = {
        name: document.getElementById('taskName').value,
        day: document.querySelector('input[name="day"]:checked').value,
        startTime: `${document.getElementById('startHour').value}:${document.getElementById('startMinute').value}`,
        endTime: `${document.getElementById('endHour').value}:${document.getElementById('endMinute').value}`,
        color: document.querySelector('.color-option.selected').dataset.color, // hay!
        description: document.getElementById('description').value
    };

    console.log('New Task:', taskData);
    // Here you would typically send the data to your backend
    // closeModal();
});