export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
  return { valid: errors.length === 0, errors };
};

export const validatePostalCode = (postalCode: string): boolean => {
  // US Zip: 5 or 9 digits, Canada: A1A 1A1, UK: Various patterns
  const patterns = [
    /^\d{5}(-\d{4})?$/, // US
    /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/, // Canada
    /^[A-Z]{1,2}\d[A-Z\d]? ?(\d[A-Z]{2}|[A-Z]{2}\d)$/, // UK
  ];
  return patterns.some(pattern => pattern.test(postalCode));
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Luhn algorithm
  const cleaned = cardNumber.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const [month, year] = expiryDate.split("/").map(s => s.trim());
  
  if (!month || !year) return false;
  
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (monthNum < 1 || monthNum > 12) return false;
  
  const currentDate = new Date();
  const expiryYear = 2000 + yearNum;
  
  if (expiryYear < currentDate.getFullYear()) return false;
  if (expiryYear === currentDate.getFullYear() && monthNum < currentDate.getMonth() + 1) {
    return false;
  }
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};
