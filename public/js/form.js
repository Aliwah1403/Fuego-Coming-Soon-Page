const email = document.getElementById('email');
const submitBtn = document.querySelector('.submit-btn')

const loader = document.querySelector('.loader');

submitBtn.addEventListener('click', () => {
    if (!email.value.length) {
        showAlert('Please enter an email address')
    } else {
        loader.style.display = 'block'
        sendData('/', {
            email: email.value,
        })
    }
})

const sendData = (path, data) => {
    fetch(path, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(response => {
            processData(response)
        })
}

const processData = (data) => {
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert);
    } else if (data.email) {
        showAlert('Email Added')
        setTimeout(() => {
            location.reload();
        }, 1300)
    }
}

// toast-notification
const toast = document.querySelector(".toast-alert");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

// alert function
const showAlert = (message) => {
    let toastMsg = document.querySelector('.text-2');
    toastMsg.innerHTML = message;
    progress.classList.add('active');
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);

    setTimeout(() => {
        progress.classList.remove("active");
    }, 3300)

    closeIcon.addEventListener('click', () => {
        toast.classList.remove("active");
    })

    // setTimeout(() => {
    //   progress.classList.remove("active");
    // }, 300)

}