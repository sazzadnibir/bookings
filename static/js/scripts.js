let attention = Prompt();

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    }, false);
});

// Alert
function notify(msg, msgType) {
    notie.alert({
        type: msgType,
        text: msg
    });
}

function alertError(msg) {
    notie.alert({
        type: msgType,
        text: msg
    });
}

function alertWarning(msg) {
    notie.alert({
        type: msgType,
        text: msg
    });
}

function notifyModal(title, text, icon, confirmationButton) {
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
        confirmButtonText: confirmationButton
    });
}

// button for test
document.getElementById('colorBtn').addEventListener('click', () => {
    // attention.custom({ msg: 'Hello World' });

    let html = `
        <form action="/make-reservation" method="GET" class="py-3 needs-validation" novalidate>
            <div class="form-group py-3">
                <label for="start_date">Starting Date</label>
                <input type="date" class="form-control" id="start_date" aria-describedby="startDateHelp" placeholder="Enter email" required>
                <small id="startDateHelp" class="form-text text-muted">Select your starting date</small>
            </div>
            <div class="form-group">
                <label for="end_date">Ending Date</label>
                <input type="date" class="form-control" id="end_date" aria-describedby="endDateHelp" placeholder="Enter email" required>
                <small id="endDateHelp" class="form-text text-muted">Select your ending date</small>
            </div>
            
            <div class="d-grid">
                <button type="submit" class="btn btn-primary mt-3">Search Availability</button>
            </div>
        </form>
    `;

    attention.custom({ msg: html });
});

function Prompt() {
    let toast = function (c) {
        const {
            msg = '',
            icon = 'success',
            position = 'top-end'
        } = c;

        const Toast = Swal.mixin({
            toast: true,
            title: msg,
            position: position,
            icon: icon,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire();
    }

    function success(c) {
        const {
            msg = '',
            title = '',
            footer = ''
        } = c;

        Swal.fire({
            icon: 'success',
            title: title,
            text: msg,
            footer: footer
        });
    }

    function error(c) {
        const {
            msg = '',
            title = '',
            footer = ''
        } = c;

        Swal.fire({
            icon: 'error',
            title: title,
            text: msg,
            footer: footer
        });
    }

    async function custom(c) {
        const {
            msg = '',
            title = ''
        } = c;

        const { value: formValues } = await Swal.fire({
            title: title,
            html: msg,
            backdrop: false,
            focusConfirm: false,
            showCancelButton: true,
            willOpen: () => {
                const elem = document.getElementById('reservation-dates-modal');
                // const rp = new DateRangePicker(elem, {
                //     format: 'yyyy-mm-dd'
                // });
            },
            preConfirm: () => {
                return [
                        document.getElementById('start').value,
                        document.getElementById('end').value
                    ]
                }
            });

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }
    }

    return {
        toast: toast,
        success: success,
        error: error,
        custom: custom
    };
}