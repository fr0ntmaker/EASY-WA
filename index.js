Vue.directive('phone', {
    bind(el) {  
        el.oninput = function(e) {
            if (!e.isTrusted) {
            return;
            }
            let x = this.value.replace(/\D/g, '').match(/(\d{0,16})/);
            // let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            el.dispatchEvent(new Event('input'));
            }
        }
    }
);

new Vue({
    el: "#app",
    data: {
        phone: ''
    }
})

function openWA(){                
    let number = document.getElementById("phone").value;
    
    if(number === ''){
        e.preventDefault();
        alert('Введите корректный номер')
    } else {
        // Удаляем все символы кроме цифр
        let cleanNumber = number.replace(/\D/g, '');
        
        // Если первая цифра 8, меняем её на 7
        if(cleanNumber.charAt(0) === '8') {
            cleanNumber = '7' + cleanNumber.slice(1);
        }
        
        // Открываем WhatsApp с обработанным номером
        window.open(`https://wa.me/${cleanNumber}`)
    }                
}

// Function needed by BS Popover
$(function () {
    $('[data-toggle="popover"]').popover()
  })

// Function needed by BS Modal
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
