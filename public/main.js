  // listener: what happens when you initially click on edit button
  // make edit button disappear, save button appear
  // make them editable

document.querySelectorAll('.edit-contact').forEach(editButton => {

  editButton.addEventListener('click', () => {
    const row = editButton.parentElement.parentElement; 
    const saveButton = row.querySelector('.save-contact'); 

    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';

    Array.from(row.children).forEach((cell, index) => {
      if (index < 8) { // not including the last cell (actions)
        const inputType = index === 4 || index === 5 ? 'date' : 'text'; 
        const currentValue = cell.innerText.trim();
        cell.innerHTML = `<input type="${inputType}" value="${currentValue}" class="form-control">`;
      }
    });
  });
});


document.querySelectorAll('.save-contact').forEach(saveButton => {
  saveButton.addEventListener('click', async () => {
    const row = saveButton.parentElement.parentElement;
    const editButton = row.querySelector('.edit-contact'); 
    const contactId = saveButton.getAttribute('data-id');

    const updatedContact = {
      name: row.children[0].querySelector('input').value,
      jobTitle: row.children[1].querySelector('input').value,
      company: row.children[2].querySelector('input').value,
      whereMet: row.children[3].querySelector('input').value,
      whenMet: row.children[4].querySelector('input').value,
      lastMessaged: row.children[5].querySelector('input').value,
      numConversations: row.children[6].querySelector('input').value || 0,
      comments: row.children[7].querySelector('input').value
    };

    const response = await fetch(`/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    });

    if (response.ok) {
      location.reload(); 
    } else {
      console.error('could not update contact');
    }

    saveButton.style.display = 'none';
    editButton.style.display = 'inline-block';
  });
});


document.querySelectorAll('.delete-contact').forEach(button => {
  button.addEventListener('click', async () => {
      const contactId = button.getAttribute('data-id');

      const confirmDelete = confirm('You sure you wanna delete them?');
      if (!confirmDelete) return;

      try {
          const response = await fetch(`/contacts/${contactId}`, {
              method: 'delete',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              location.reload();
          } else {
              console.error('Delete contact failed');
              alert('Delete contact failed');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Error when deleting contact');
      }
  });
});
