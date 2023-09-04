import jwtDecode from "jwt-decode";

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor = 800
) => {
  let timeout: NodeJS.Timeout;
  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced;
};

export const validate_only_letters = (
  val: string,
  maxLetter = 50,
  minLetter = 3
) => {
  const trimmedVal = val.trim();

  if (trimmedVal.length === 0) {
    return "Ingrese datos válidos, sin espacios en blanco.";
  }

  if (trimmedVal.length > maxLetter) {
    return `Los datos deben tener un máximo de ${maxLetter} caracteres.`;
  }

  if (trimmedVal.length < minLetter) {
    return `Los datos deben tener un mínimo de ${minLetter} caracteres.`;
  }

  const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
  if (!regex.test(trimmedVal)) {
    return "Únicamente se permiten letras y un espacio en blanco entre palabras.";
  }

  if (trimmedVal !== val) {
    return "No se permiten espacios en blanco al principio ni al final.";
  }

  return "";
};

export const validate_letters_and_numbers = (
  val: string,
  maxCharacters = 50,
  minCharacters = 3
) => {
  const trimmedVal = val.trim();

  if (trimmedVal.length === 0) {
    return "Ingrese datos válidos, sin espacios en blanco.";
  }

  if (trimmedVal.length > maxCharacters) {
    return `Los datos deben tener un máximo de ${maxCharacters} caracteres.`;
  }

  if (trimmedVal.length < minCharacters) {
    return `Los datos deben tener un mínimo de ${minCharacters} caracteres.`;
  }

  const regex = /^[\S]+(\s[\S]+)*$/;
  if (!regex.test(trimmedVal)) {
    return "Solo se permite un espacio en blanco entre palabras.";
  }

  if (trimmedVal !== val) {
    return "No se permiten espacios en blanco al principio ni al final.";
  }

  return "";
};

export const validate_email = (email: string) => {
  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return "Ingrese un correo electrónico válido sin espacios en blanco.";
  }

  if (trimmedEmail.length > 50) {
    return `El correo electrónico debe tener un máximo de ${50} caracteres.`;
  }

  const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
  if (!regex.test(trimmedEmail)) {
    return "Ingrese un correo electrónico válido sin espacios en blanco.";
  }

  return "";
};

export const validate_url = (url: string) => {
  const trimmedUrl = url.trim();

  if (trimmedUrl.length === 0) {
    return "Ingrese una URL válida sin espacios en blanco.";
  }

  if (trimmedUrl.length > 255) {
    return "La URL debe tener un máximo de 255 caracteres.";
  }

  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!regex.test(trimmedUrl)) {
    return "La URL ingresada no tiene un formato válido. Asegúrese de incluir el protocolo (http:// o https://) y seguir el formato correcto.";
  }

  return "";
};

export const validate_password = (password: string) => {
  if (password === "") return false;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  const isLongEnough = password.length >= 8;

  return !(
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar &&
    isLongEnough
  );
};

export const validate_phone_number = (phoneNumber: string) => {
  const trimmedPhoneNumber = phoneNumber.trim(); // Eliminar espacios en blanco al inicio y al final

  if (trimmedPhoneNumber.length === 0) {
    return "Ingrese un número de teléfono válido sin espacios en blanco.";
  }

  if (trimmedPhoneNumber.length > 10) {
    return `El número de teléfono debe tener un máximo de ${10} caracteres.`;
  }

  const regex = /^\d+$/;
  if (!regex.test(trimmedPhoneNumber)) {
    return "Ingrese un número de teléfono válido sin espacios en blanco.";
  }

  return "";
};

export const getDate = (date: string | undefined) => {
  if (date) return new Date(date).toLocaleDateString("es");
  else return new Date().toLocaleDateString("es");
};

export const capitalizeFirstLetter = (text: string) => {
  return text.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwtDecode(token);
    const expirationDate: number = decodedToken.exp;
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    return expirationDate < currentTimestamp;
  } catch (error) {
    return true;
  }
};