// Enhanced deterministic password and number generation utility

export const generatePassword = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  seed = Math.abs(seed + length * 1000);
  
  // Character sets
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specials = '@$!&';
  const allChars = uppercase + lowercase + numbers + specials;
  
  // Deterministic random number generator (Linear Congruential Generator)
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let password = '';
  
  // Ensure at least one character from each required type
  const requiredChars = [
    uppercase[Math.floor(random() * uppercase.length)],
    lowercase[Math.floor(random() * lowercase.length)],
    numbers[Math.floor(random() * numbers.length)],
    specials[Math.floor(random() * specials.length)]
  ];
  
  // Add required characters to password
  for (const char of requiredChars) {
    password += char;
  }
  
  // Fill remaining positions with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(random() * allChars.length)];
  }
  
  // Shuffle the password to avoid predictable patterns
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }
  
  return passwordArray.join('');
};

// Generate deterministic uppercase letters-only password (only A-Z, no numbers or lowercase)
export const generateLettersOnlyPassword = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  // Use different multiplier for uppercase letters-only to avoid collision with other generators
  seed = Math.abs(seed + length * 7000);
  
  // Character set for uppercase letters only
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Deterministic random number generator
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let password = '';
  
  // Generate uppercase letters-only password
  for (let i = 0; i < length; i++) {
    password += uppercase[Math.floor(random() * uppercase.length)];
  }
  
  return password;
};

// Generate deterministic lowercase letters-only password (only a-z, no numbers or uppercase)
export const generateLowercaseOnlyPassword = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  // Use different multiplier for lowercase letters-only to avoid collision with other generators
  seed = Math.abs(seed + length * 8000);
  
  // Character set for lowercase letters only
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  
  // Deterministic random number generator
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let password = '';
  
  // Generate lowercase letters-only password
  for (let i = 0; i < length; i++) {
    password += lowercase[Math.floor(random() * lowercase.length)];
  }
  
  return password;
};

// Generate deterministic numbers using same logic as passwords
export const generateNumber = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  // Use different multiplier for numbers to avoid collision with passwords
  seed = Math.abs(seed + length * 2000);
  
  // Deterministic random number generator (Linear Congruential Generator)
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let number = '';
  
  // Generate each digit
  for (let i = 0; i < length; i++) {
    // For the first digit, ensure it's not 0 (unless it's a single digit)
    if (i === 0 && length > 1) {
      number += Math.floor(random() * 9) + 1; // 1-9
    } else {
      number += Math.floor(random() * 10); // 0-9
    }
  }
  
  return number;
};

// Generate human-readable passphrase
export const generatePassphrase = (name, length) => {
  // Use name as seed for deterministic generation
  let seed = 0;
  for (let i = 0; i < name.length; i++) {
    seed = ((seed << 5) - seed + name.charCodeAt(i)) & 0xffffffff;
  }
  seed = Math.abs(seed + length * 500);
  
  // Character sets for human-readable passphrase
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const vowels = 'aeiou';
  const numbers = '0123456789';
  const specials = '@$!&';
  
  // Deterministic random number generator
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let passphrase = '';
  
  // Generate human-readable patterns
  for (let i = 0; i < length; i++) {
    const position = i % 4;
    
    if (position === 0) {
      // Start with consonant (possibly uppercase)
      const char = consonants[Math.floor(random() * consonants.length)];
      passphrase += Math.random() < 0.3 ? char.toUpperCase() : char;
    } else if (position === 1) {
      // Follow with vowel
      passphrase += vowels[Math.floor(random() * vowels.length)];
    } else if (position === 2) {
      // Add consonant or number
      if (random() < 0.3) {
        passphrase += numbers[Math.floor(random() * numbers.length)];
      } else {
        passphrase += consonants[Math.floor(random() * consonants.length)];
      }
    } else {
      // Add vowel or special character
      if (random() < 0.2) {
        passphrase += specials[Math.floor(random() * specials.length)];
      } else {
        passphrase += vowels[Math.floor(random() * vowels.length)];
      }
    }
  }
  
  // Ensure minimum complexity
  const hasNumber = /[0-9]/.test(passphrase);
  const hasSpecial = /[@$!&]/.test(passphrase);
  
  if (!hasNumber && passphrase.length > 3) {
    const pos = Math.floor(random() * (passphrase.length - 1));
    passphrase = passphrase.substring(0, pos) + numbers[Math.floor(random() * numbers.length)] + passphrase.substring(pos + 1);
  }
  
  if (!hasSpecial && passphrase.length > 2) {
    const pos = Math.floor(random() * (passphrase.length - 1));
    passphrase = passphrase.substring(0, pos) + specials[Math.floor(random() * specials.length)] + passphrase.substring(pos + 1);
  }
  
  return passphrase;
};

// Generate deterministic PIN numbers (alternative number generation)
export const generatePIN = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  // Use different multiplier for PINs to avoid collision with other generators
  seed = Math.abs(seed + length * 3000);
  
  // Deterministic random number generator
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let pin = '';
  
  // Generate PIN with some constraints for better usability
  for (let i = 0; i < length; i++) {
    let digit;
    
    // Avoid too many consecutive same digits
    if (i > 0 && pin[i-1] === pin[i-2]) {
      // Force different digit
      do {
        digit = Math.floor(random() * 10);
      } while (digit.toString() === pin[i-1]);
    } else {
      digit = Math.floor(random() * 10);
    }
    
    pin += digit;
  }
  
  return pin;
};

// Generate deterministic hex numbers
export const generateHex = (name, passphrase = '', length) => {
  // Combine name and passphrase for stronger seed
  const combinedInput = (name + passphrase).toLowerCase().trim();
  
  // Create a deterministic seed from combined input and length
  let seed = 0;
  for (let i = 0; i < combinedInput.length; i++) {
    seed = ((seed << 5) - seed + combinedInput.charCodeAt(i)) & 0xffffffff;
  }
  // Use different multiplier for hex to avoid collision
  seed = Math.abs(seed + length * 4000);
  
  // Hex characters
  const hexChars = '0123456789ABCDEF';
  
  // Deterministic random number generator
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % Math.pow(2, 32);
    return currentSeed / Math.pow(2, 32);
  };
  
  let hex = '';
  
  // Generate hex string
  for (let i = 0; i < length; i++) {
    hex += hexChars[Math.floor(random() * hexChars.length)];
  }
  
  return hex;
};

// Additional utility to validate password strength
export const validatePasswordStrength = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecials = /[@$!&]/.test(password);
  const isLongEnough = password.length >= 8;
  
  const score = [hasUppercase, hasLowercase, hasNumbers, hasSpecials, isLongEnough]
    .filter(Boolean).length;
  
  if (score >= 5) return 'Strong';
  if (score >= 3) return 'Medium';
  return 'Weak';
};

// Utility to validate number properties
export const validateNumberProperties = (number) => {
  const length = number.length;
  const hasRepeatingDigits = /(.)\1{2,}/.test(number);
  const isSequential = /012|123|234|345|456|567|678|789|890/.test(number);
  
  return {
    length,
    hasRepeatingDigits,
    isSequential,
    entropy: Math.log2(Math.pow(10, length))
  };
};