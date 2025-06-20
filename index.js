// Translations object
const translations = {
    en: {
        enterNumber: "Enter phone number:",
        placeholder: "1(111)-111-1111",
        checkNumber: "Check your input:",
        openButton: "Open in WhatsApp",
        feedback: "Feedback",
        donate: "Donate",
        copyright: "2025 © Easy-WA",
        cookieText: "We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.",
        cookieAccept: "Accept",
        cookieDecline: "Decline",
        googleFormLink: "https://forms.gle/dbpUx7eVrEQ3Mgg18",
        alertMessage: "Please enter a valid number"
    },
    ru: {
        enterNumber: "Введите номер:",
        placeholder: "7(777)-777-7777",
        checkNumber: "Проверьте введенный номер:",
        openButton: "Открыть в WhatsApp",
        feedback: "Обратная связь",
        donate: "Поддержать",
        copyright: "2025 © Easy-WA",
        cookieText: "Мы используем файлы cookie для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с использованием cookie.",
        cookieAccept: "Принять",
        cookieDecline: "Отказаться",
        googleFormLink: "https://forms.gle/eCHAsBiCDG1LNokH8",
        alertMessage: "Введите корректный номер"
    },
    ar: {
        enterNumber: "أدخل الرقم:",
        placeholder: "1(111)-111-1111",
        checkNumber: "تحقق من الرقم:",
        openButton: "افتح في WhatsApp",
        feedback: "ملاحظات",
        donate: "تبرع",
        copyright: "١٤٤٧ © Easy-WA",
        cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. من خلال الاستمرار في استخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
        cookieAccept: "قبول",
        cookieDecline: "رفض",
        googleFormLink: "https://forms.gle/dbpUx7eVrEQ3Mgg18",
        alertMessage: "الرجاء إدخال رقم صحيح"
    }
};

// Vue directive for phone formatting
Vue.directive('phone', {
    bind(el) {  
        el.oninput = function(e) {
            if (!e.isTrusted) {
                return;
            }
            
            // Get only digits
            let digits = this.value.replace(/\D/g, '');
            
            // If first digit is 8, change to 7
            if (digits.charAt(0) === '8') {
                digits = '7' + digits.slice(1);
            }
            
            // Format the number
            let x = digits.match(/(\d{0,16})/);
            this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            
            el.dispatchEvent(new Event('input'));
        }
    }
});

// Vue app
new Vue({
    el: "#app",
    data: {
        phone: '',
        currentLang: 'en',
        t: translations.en,
        showCookieBanner: false
    },
    mounted() {
        // Check saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && translations[savedLang]) {
            this.changeLanguage(savedLang);
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('ru')) {
                this.changeLanguage('ru');
            } else if (browserLang.startsWith('ar')) {
                this.changeLanguage('ar');
            }
        }
        
        // Show cookie banner if not accepted
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                this.showCookieBanner = true;
            }, 1000);
        }
    },
    methods: {
        changeLanguage(lang) {
            this.currentLang = lang;
            this.t = translations[lang];
            localStorage.setItem('preferredLanguage', lang);
            
            // Update page direction for Arabic
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            
            // Update meta description
            const descriptions = {
                en: "Send WhatsApp messages without saving contact",
                ru: "Отправка WhatsApp сообщений без сохранения номера",
                ar: "إرسال رسائل واتساب بدون حفظ الرقم"
            };
            document.querySelector('meta[name="description"]').content = descriptions[lang];
        },
        openWA() {
            let number = this.phone.replace(/\D/g, '');
            
            if(number === ''){
                alert(this.t.alertMessage);
                return;
            }
            
            // If first digit is 8, change to 7 (just in case)
            if(number.charAt(0) === '8') {
                number = '7' + number.slice(1);
            }
            
            window.open(`https://wa.me/${number}`);
        },
        acceptCookies() {
            localStorage.setItem('cookiesAccepted', 'true');
            this.showCookieBanner = false;
            
            // Initialize analytics here if needed
            this.initializeAnalytics();
        },
        declineCookies() {
            localStorage.setItem('cookiesAccepted', 'false');
            this.showCookieBanner = false;
        },
        initializeAnalytics() {
            // Add Google Analytics or other analytics here if needed
            // For example:
            // if (window.gtag) {
            //     gtag('consent', 'update', {
            //         'analytics_storage': 'granted'
            //     });
            // }
        },
        copyToClipboard(text, walletType) {
            // Create temporary input
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            
            try {
                document.execCommand('copy');
                alert(`${walletType} wallet address copied: ${text}`);
            } catch (err) {
                // Fallback - show address for manual copy
                prompt(`Copy ${walletType} wallet address:`, text);
            }
            
            document.body.removeChild(tempInput);
        }
    }
});

// Bootstrap popover initialization
$(function () {
    $('[data-toggle="popover"]').popover()
});