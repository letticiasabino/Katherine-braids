'use strict';

const WHATSAPP_NUMBER = '5521975763183';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll('.whatsapp-link[data-message]').forEach((link) => {
    link.href = whatsappUrl(link.dataset.message);
  });
  document.querySelectorAll('.service-whatsapp').forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.service;
      window.open(whatsappUrl(`Olá! Vi o serviço ${service} no seu site e gostaria de saber o valor e os horários disponíveis.`), '_blank', 'noopener,noreferrer');
    });
  });
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  let scrollPos = 0;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    document.body.style.position = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
  };

  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    if (opening) {
      scrollPos = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPos}px`;
      document.body.style.width = '100%';
    } else {
      closeMenu();
      return;
    }
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('open', opening);
    document.body.classList.toggle('menu-open', opening);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

function setupHeaderAndReveals() {
  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  items.forEach((item) => observer.observe(item));
}

function setupGallery() {
  const items = [...document.querySelectorAll('.gallery-item')];
  const lightbox = document.querySelector('#lightbox');
  const image = document.querySelector('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let currentIndex = 0;
  let lastFocused = null;

  const render = (index) => {
    currentIndex = (index + items.length) % items.length;
    const source = items[currentIndex].querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = `${source.alt} — ${currentIndex + 1} de ${items.length}`;
  };
  const open = (index) => {
    lastFocused = document.activeElement;
    render(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    void lightbox.offsetWidth;
    closeButton.focus({ preventScroll: true });
    window.setTimeout(() => closeButton.focus({ preventScroll: true }), 0);
  };
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    image.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  };
  items.forEach((item, index) => item.addEventListener('click', () => open(index)));
  closeButton.addEventListener('click', close);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => render(currentIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => render(currentIndex + 1));
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') render(currentIndex - 1);
    if (event.key === 'ArrowRight') render(currentIndex + 1);
    if (event.key === 'Tab') {
      const controls = [...lightbox.querySelectorAll('button')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

function localISODate(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().split('T')[0];
}

function formatBrazilianDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function phoneMask(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.replace(/(\d{0,2})/, '($1');
  if (digits.length <= 6) return digits.replace(/(\d{2})(\d+)/, '($1) $2');
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  return digits.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
}

function setupBookingForm() {
  const form = document.querySelector('#booking-form');
  const dateField = form.elements.date;
  const phoneField = form.elements.phone;
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('.submit-button');
  const submitLabel = submitButton.querySelector('span');
  const initialLabel = submitLabel.textContent;
  dateField.min = localISODate();
  phoneField.addEventListener('input', () => { phoneField.value = phoneMask(phoneField.value); });

  const errorMessages = {
    name: 'Informe seu nome completo (nome e sobrenome).', phone: 'Informe um telefone brasileiro válido com DDD.',
    service: 'Selecione o serviço desejado.', length: 'Selecione o comprimento desejado.',
    color: 'Informe uma cor ou escreva “Ainda não decidi”.', date: 'Escolha uma data válida a partir de hoje.',
    period: 'Selecione um período preferencial.', confirmation: 'Confirme que está ciente das condições do agendamento.'
  };
  const setError = (field, message = '') => {
    const error = document.querySelector(`#${field.id}-error`);
    field.classList.toggle('invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (message) field.setAttribute('aria-describedby', error.id); else field.removeAttribute('aria-describedby');
    error.textContent = message;
  };
  const validate = () => {
    const fields = ['name', 'phone', 'service', 'length', 'color', 'date', 'period', 'confirmation'];
    let valid = true;
    fields.forEach((name) => {
      const field = form.elements.namedItem(name);
      let invalid = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      if (name === 'name' && field.value.trim()) invalid = field.value.trim().split(/\s+/).length < 2 || field.value.trim().length < 5;
      if (name === 'phone' && field.value) invalid = field.value.replace(/\D/g, '').length < 10;
      if (name === 'date' && field.value) invalid = field.value < localISODate();
      setError(field, invalid ? errorMessages[name] : '');
      if (invalid) valid = false;
    });
    return valid;
  };
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener(field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'blur', () => {
      if (field.classList.contains('invalid') || field.type === 'checkbox') validate();
    });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.className = 'form-status';
    if (!validate()) {
      status.textContent = 'Revise os campos destacados para continuar.';
      status.classList.add('show', 'error-status');
      form.querySelector('.invalid')?.focus();
      return;
    }
    if (submitButton.disabled) return;
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitLabel.textContent = 'Preparando sua mensagem...';
    status.textContent = 'Tudo certo! O WhatsApp será aberto para você revisar e enviar a solicitação.';
    status.classList.add('show', 'success-status');
    const data = new FormData(form);
    const message = [
      'Olá! Gostaria de solicitar um agendamento.', '',
      `Nome: ${data.get('name').trim()}`, `Telefone: ${data.get('phone')}`,
      `Serviço: ${data.get('service')}`, `Comprimento: ${data.get('length')}`,
      `Cor desejada: ${data.get('color').trim()}`, `Data preferencial: ${formatBrazilianDate(data.get('date'))}`,
      `Período: ${data.get('period')}`, `Observações: ${data.get('message').trim() || 'Sem observações.'}`, '',
      'Estou aguardando a confirmação do horário. Obrigada!'
    ].join('\n');
    const popup = window.open('', '_blank');
    if (popup) popup.opener = null;
    window.setTimeout(() => {
      if (popup) popup.location.href = whatsappUrl(message);
      else window.location.href = whatsappUrl(message);
      window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitLabel.textContent = initialLabel;
      }, 1400);
    }, reduceMotion ? 50 : 650);
  });
}

function setupImageFallbacks() {
  document.querySelectorAll('img').forEach((image) => {
    if (!image.getAttribute('src')) return;
    image.addEventListener('error', () => {
      image.classList.add('image-missing');
      image.alt = `${image.alt || 'Imagem'} — arquivo não encontrado na pasta img`;
    }, { once: true });
  });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
setupWhatsAppLinks();
setupMenu();
setupHeaderAndReveals();
setupGallery();
setupBookingForm();
setupImageFallbacks();
