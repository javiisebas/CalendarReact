import Swal from "sweetalert2";

export const fireErrorsSwal = (msg, errors) => {
    if (errors) {
        for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
                const {
                    msg
                } = errors[key];
                Swal.fire('Error', msg, 'error')
            }
        }
    } else if (msg) {
        Swal.fire('Error', msg, 'error')
    }
}