export class FormManager {
    constructor() {
        this.STORAGE_KEYS = {
            REGISTRATION: 'ouab_registration_data',
            CONTACT: 'ouab_contact_data',
            PREFERENCES: 'ouab_user_preferences'
        };
        this.initializeForms();
    }

    saveFormData(formType, data) {
        try {
            const storageKey = this.STORAGE_KEYS[formType.toUpperCase()];
            if (storageKey) {
                localStorage.setItem(storageKey, JSON.stringify({
                    ...data,
                    timestamp: new Date().toISOString()
                }));
                return true;
            }
        } catch (error) {
            console.error('Erro ao salvar dados do formulário:', error);
        }
        return false;
    }

    loadFormData(formType) {
        try {
            const storageKey = this.STORAGE_KEYS[formType.toUpperCase()];
            if (storageKey) {
                const saved = localStorage.getItem(storageKey);
                return saved ? JSON.parse(saved) : null;
            }
        } catch (error) {
            console.error('Erro ao carregar dados do formulário:', error);
        }
        return null;
    }

    extractFormData(formElement) {
        const formData = new FormData(formElement);
        const inputs = [...formElement.querySelectorAll('input, textarea, select')];
        
        return inputs.reduce((data, input) => {
            if (input.type === 'checkbox') {
                data[input.name || input.placeholder.toLowerCase().replace(/\s+/g, '_')] = input.checked;
            } else if (input.type !== 'submit' && input.type !== 'button') {
                const key = input.name || input.placeholder.toLowerCase().replace(/\s+/g, '_');
                data[key] = input.value;
            }
            return data;
        }, {});
    }

    fillFormFields(formElement, data) {
        if (!data) return;

        const inputs = formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const key = input.name || input.placeholder.toLowerCase().replace(/\s+/g, '_');
            if (data[key] !== undefined) {
                if (input.type === 'checkbox') {
                    input.checked = data[key];
                } else if (input.type !== 'submit' && input.type !== 'button') {
                    input.value = data[key];
                }
            }
        });
    }

    setupAutoSave(formElement, formType) {
        const inputs = formElement.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = this.extractFormData(formElement);
                this.saveFormData(formType, formData);
            });
        });
    }

    setupRegistrationForm() {
        const registrationForm = document.querySelector('form:not(#formContato)');
        if (!registrationForm) return;

        const inputs = registrationForm.querySelectorAll('input');
        const fieldNames = ['nome', 'email', 'senha', 'confirmar_senha', 'aceito_termos', 'receber_ofertas'];
        inputs.forEach((input, index) => {
            if (index < fieldNames.length) {
                input.name = fieldNames[index];
            }
        });

        const savedData = this.loadFormData('REGISTRATION');
        this.fillFormFields(registrationForm, savedData);

        this.setupAutoSave(registrationForm, 'REGISTRATION');

        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.extractFormData(registrationForm);
            
            if (formData.senha !== formData.confirmar_senha) {
                alert('As senhas não coincidem!');
                return;
            }

            if (!formData.aceito_termos) {
                alert('Você deve aceitar os termos de uso!');
                return;
            }

            this.saveFormData('REGISTRATION', {
                ...formData,
                status: 'completed',
                completedAt: new Date().toISOString()
            });

            this.showRegistrationSuccess();
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('formContato');
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea');
        const fieldNames = ['nome', 'email', 'mensagem'];
        inputs.forEach((input, index) => {
            if (index < fieldNames.length) {
                input.name = fieldNames[index];
            }
        });

        const savedData = this.loadFormData('CONTACT');
        this.fillFormFields(contactForm, savedData);

        this.setupAutoSave(contactForm, 'CONTACT');

        contactForm.removeEventListener('submit', this.originalContactHandler);
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.extractFormData(contactForm);

            this.saveFormData('CONTACT', {
                ...formData,
                status: 'sent',
                sentAt: new Date().toISOString()
            });

            contactForm.classList.add('hidden');
            document.getElementById('mensagemAgradecimento').classList.remove('hidden');

            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                document.getElementById('mensagemAgradecimento').classList.add('hidden');
                localStorage.removeItem(this.STORAGE_KEYS.CONTACT);
            }, 3000);
        });
    }

    showRegistrationSuccess() {
        const form = document.querySelector('form:not(#formContato)');
        const originalHTML = form.innerHTML;

        form.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
                <h3 class="text-[#8a7462] text-2xl font-bold mb-4">Conta Criada com Sucesso!</h3>
                <p class="text-[#655548] mb-6">Bem-vindo à nossa livraria online!</p>
                <button onclick="location.reload()" class="bg-[#cc9fa4] text-white px-6 py-3 rounded-lg hover:bg-[#a67a80] transition-colors">
                    Fazer Login
                </button>
            </div>
        `;

        setTimeout(() => {
            form.innerHTML = originalHTML;
            this.setupRegistrationForm();
        }, 5000);
    }

    getFormStats() {
        const registrationData = this.loadFormData('REGISTRATION');
        const contactData = this.loadFormData('CONTACT');
        
        const stats = {
            hasRegistration: !!registrationData,
            hasContactHistory: !!contactData,
            registrationComplete: registrationData?.status === 'completed',
            lastActivity: null
        };

        const activities = [registrationData, contactData]
            .filter(data => data && data.timestamp)
            .map(data => new Date(data.timestamp));

        if (activities.length > 0) {
            stats.lastActivity = new Date(Math.max(...activities));
        }

        return stats;
    }

    clearAllFormData() {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    initializeForms() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupRegistrationForm();
            this.setupContactForm();
        });
    }

    exportAllData() {
        const allData = {};
        Object.entries(this.STORAGE_KEYS).forEach(([key, storageKey]) => {
            allData[key.toLowerCase()] = this.loadFormData(key);
        });

        return {
            forms: allData,
            stats: this.getFormStats(),
            exportedAt: new Date().toISOString()
        };
    }
}
