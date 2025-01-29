const ulItems = document.getElementById('ul-items')
const addItem = document.getElementById('add-item')
const taskInput = document.getElementById('task-input')
const message = document.getElementById('message')
const overlay = document.querySelector('.overlay')

const task = document.querySelector('.task')
const delateItem = document.getElementById('delate-modal-item')
const closeModalItem = document.getElementById('close-modal-item')
const delateModal = document.getElementById('delate-modal')

const editModal = document.getElementById('edit-modal')
const closeModalEdit = document.getElementById('close-modal-edit')
const editInput = document.getElementById('edit-input')
const saveModalItem = document.getElementById('save-modal-item')

// toggle modal
function toggleModal(modal, isActive){
    if(isActive){
        modal.classList.add('active')
        overlay.classList.add('active')
    }else{
        modal.classList.remove('active')
        overlay.classList.remove('active')
        
    }
}

let currentItem = null
// delate task
function delateOpenModal(target) {
    currentItem = target.closest('li')
    task.textContent = currentItem.textContent
    if(currentItem){
        toggleModal(delateModal, true)
    }
}

delateItem.addEventListener('click', () => {
    if (currentItem){
        currentItem.remove()
        toggleModal(delateModal, false)
        message.textContent = `${currentItem.textContent} muvaffaqiyatli ochirildi`
        message.classList.add('active')
        setTimeout(() => message.textContent = '', 3000)
    }
})

closeModalItem.addEventListener('click', () => toggleModal(delateModal, false))


// edit task
function editOpenModal(target){
    currentItem = target.closest('li')

    if(currentItem){
        toggleModal(editModal, true)
        editInput.value = currentItem.textContent.trim()
    }
}

saveModalItem.addEventListener('click', () =>{
    const newValue = editInput.value.trim()
    currentItem.querySelector('.name').textContent = newValue
    toggleModal(editModal, false)
    message.textContent = `muvaffaqiyatli taxrirlandi`
    message.classList.add('active')
    setTimeout(() => message.textContent = '', 3000)
})
closeModalEdit.addEventListener('click', () => toggleModal(editModal, false))
ulItems.addEventListener('click', (e) =>{
    const target = e.target
    if(target.classList.contains('fa-trash-can')){
        delateOpenModal(target)
    }else if(target.classList.contains('fa-pen-to-square')){
        editOpenModal(target)
    }
})

function createTask(inputValue){
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="name">${inputValue}</div>
        <div class="action">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    `;
    li.addEventListener('dblclick', () => {
        li.classList.toggle('complated')
    })
    ulItems.appendChild(li);
}
addItem.addEventListener('click', () => {
    
    const inputValue = taskInput.value.trim()
    if (inputValue){
        createTask(inputValue)
    }
    else{
        message.textContent = 'input bosh bolmasin'
        message.classList.add('error')
        setTimeout(() => message.textContent = '', 3000)
    }
    taskInput.value = ''
})

document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape' && delateModal)
        toggleModal(delateModal, false)
    if(e.key == 'Escape' && editModal){
        toggleModal(editModal, false)
    }
})




