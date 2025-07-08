// Enhanced deterministic password generation utility
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
    passphrase = passphrase.substring(0, pos) + 
                numbers[Math.floor(random() * numbers.length)] + 
                passphrase.substring(pos + 1);
  }
  
  if (!hasSpecial && passphrase.length > 2) {
    const pos = Math.floor(random() * (passphrase.length - 1));
    passphrase = passphrase.substring(0, pos) + 
                specials[Math.floor(random() * specials.length)] + 
                passphrase.substring(pos + 1);
  }
  
  return passphrase;
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