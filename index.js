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
            alert('Введите правильный номер')
        } else {
    window.open(`https://wa.me/${number}`)
    }                
}

// Function needed by BS popover
$(function () {
    $('[data-toggle="popover"]').popover()
  })