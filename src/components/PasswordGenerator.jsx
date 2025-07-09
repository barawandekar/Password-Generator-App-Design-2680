import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { 
  generatePassword, 
  generatePassphrase, 
  generateNumber, 
  generateLettersOnlyPassword,
  generateLowercaseOnlyPassword
} from '../utils/passwordUtils';

const { 
  FiUser, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiCopy, 
  FiCheck, 
  FiRefreshCw, 
  FiKey, 
  FiEdit3, 
  FiZap, 
  FiHash, 
  FiAlignLeft,
  FiType
} = FiIcons;

const PasswordGenerator = () => {
  const [name, setName] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [passphraseMode, setPassphraseMode] = useState('none'); // 'none', 'custom', 'generate'
  const [customPassphrase, setCustomPassphrase] = useState('');
  const [passphraseLength, setPassphraseLength] = useState(6);
  const [generatedPassphrase, setGeneratedPassphrase] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Number generation states
  const [numberLength, setNumberLength] = useState(6);
  const [generatedNumber, setGeneratedNumber] = useState('');
  const [numberCopied, setNumberCopied] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  
  // Letters-only password states
  const [lettersOnlyLength, setLettersOnlyLength] = useState(10);
  const [lettersOnlyPassword, setLettersOnlyPassword] = useState('');
  const [lettersOnlyCopied, setLettersOnlyCopied] = useState(false);
  const [showLettersOnly, setShowLettersOnly] = useState(false);
  
  // Lowercase-only password states
  const [lowercaseOnlyLength, setLowercaseOnlyLength] = useState(10);
  const [lowercaseOnlyPassword, setLowercaseOnlyPassword] = useState('');
  const [lowercaseOnlyCopied, setLowercaseOnlyCopied] = useState(false);
  const [showLowercaseOnly, setShowLowercaseOnly] = useState(false);

  const handleGeneratePassword = useCallback(async () => {
    if (!name.trim()) return;
    
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let finalPassphrase = '';
    let newGeneratedPassphrase = '';
    
    if (passphraseMode === 'custom') {
      finalPassphrase = customPassphrase;
    } else if (passphraseMode === 'generate') {
      newGeneratedPassphrase = generatePassphrase(name.trim(), passphraseLength);
      finalPassphrase = newGeneratedPassphrase;
      setGeneratedPassphrase(newGeneratedPassphrase);
    }
    
    const generatedPassword = generatePassword(name.trim(), finalPassphrase, passwordLength);
    setPassword(generatedPassword);
    setShowPassword(false);
    setShowPassphrase(false);
    setIsGenerating(false);
  }, [name, passwordLength, passphraseMode, customPassphrase, passphraseLength]);

  const handleGenerateNumber = useCallback(async () => {
    if (!name.trim()) return;
    
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let finalPassphrase = '';
    if (passphraseMode === 'custom') {
      finalPassphrase = customPassphrase;
    } else if (passphraseMode === 'generate' && generatedPassphrase) {
      finalPassphrase = generatedPassphrase;
    }
    
    const number = generateNumber(name.trim(), finalPassphrase, numberLength);
    setGeneratedNumber(number);
    setShowNumber(false);
    setIsGenerating(false);
  }, [name, numberLength, passphraseMode, customPassphrase, generatedPassphrase]);
  
  const handleGenerateLettersOnly = useCallback(async () => {
    if (!name.trim()) return;
    
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let finalPassphrase = '';
    if (passphraseMode === 'custom') {
      finalPassphrase = customPassphrase;
    } else if (passphraseMode === 'generate' && generatedPassphrase) {
      finalPassphrase = generatedPassphrase;
    }
    
    const lettersOnly = generateLettersOnlyPassword(name.trim(), finalPassphrase, lettersOnlyLength);
    setLettersOnlyPassword(lettersOnly);
    setShowLettersOnly(false);
    setIsGenerating(false);
  }, [name, lettersOnlyLength, passphraseMode, customPassphrase, generatedPassphrase]);
  
  const handleGenerateLowercaseOnly = useCallback(async () => {
    if (!name.trim()) return;
    
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let finalPassphrase = '';
    if (passphraseMode === 'custom') {
      finalPassphrase = customPassphrase;
    } else if (passphraseMode === 'generate' && generatedPassphrase) {
      finalPassphrase = generatedPassphrase;
    }
    
    const lowercaseOnly = generateLowercaseOnlyPassword(name.trim(), finalPassphrase, lowercaseOnlyLength);
    setLowercaseOnlyPassword(lowercaseOnly);
    setShowLowercaseOnly(false);
    setIsGenerating(false);
  }, [name, lowercaseOnlyLength, passphraseMode, customPassphrase, generatedPassphrase]);

  const handleCopyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const handleCopyNumber = async () => {
    if (!generatedNumber) return;
    
    try {
      await navigator.clipboard.writeText(generatedNumber);
      setNumberCopied(true);
      setTimeout(() => setNumberCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy number:', err);
    }
  };
  
  const handleCopyLettersOnly = async () => {
    if (!lettersOnlyPassword) return;
    
    try {
      await navigator.clipboard.writeText(lettersOnlyPassword);
      setLettersOnlyCopied(true);
      setTimeout(() => setLettersOnlyCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy letters-only password:', err);
    }
  };
  
  const handleCopyLowercaseOnly = async () => {
    if (!lowercaseOnlyPassword) return;
    
    try {
      await navigator.clipboard.writeText(lowercaseOnlyPassword);
      setLowercaseOnlyCopied(true);
      setTimeout(() => setLowercaseOnlyCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy lowercase-only password:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleGeneratePassword();
    }
  };

  const resetPassphrase = () => {
    setCustomPassphrase('');
    setGeneratedPassphrase('');
    setPassword('');
    setGeneratedNumber('');
    setLettersOnlyPassword('');
    setLowercaseOnlyPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <SafeIcon icon={FiLock} className="text-2xl text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Enhanced Password Generator</h1>
            <p className="text-gray-600 text-sm">Create secure passwords with deterministic algorithms</p>
          </div>

          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiUser} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
              />
            </div>
          </motion.div>

          {/* Four Column Layout for Length Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Password Length Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Password: {passwordLength}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="8"
                  max="50"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8</span>
                  <span>50</span>
                </div>
              </div>
            </motion.div>

            {/* Number Length Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number: {numberLength}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={numberLength}
                  onChange={(e) => setNumberLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>20</span>
                </div>
              </div>
            </motion.div>
            
            {/* Letters Only Password Length Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">
                UPPERCASE: {lettersOnlyLength}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={lettersOnlyLength}
                  onChange={(e) => setLettersOnlyLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>30</span>
                </div>
              </div>
            </motion.div>
            
            {/* Lowercase Only Password Length Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">
                lowercase: {lowercaseOnlyLength}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={lowercaseOnlyLength}
                  onChange={(e) => setLowercaseOnlyLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>30</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Passphrase Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Passphrase Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="passphraseMode"
                  value="none"
                  checked={passphraseMode === 'none'}
                  onChange={(e) => {
                    setPassphraseMode(e.target.value);
                    resetPassphrase();
                  }}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">No passphrase (name only)</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="passphraseMode"
                  value="custom"
                  checked={passphraseMode === 'custom'}
                  onChange={(e) => {
                    setPassphraseMode(e.target.value);
                    resetPassphrase();
                  }}
                  className="mr-3 text-blue-600"
                />
                <SafeIcon icon={FiEdit3} className="mr-2 text-gray-500" />
                <span className="text-gray-700">Enter custom passphrase</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="passphraseMode"
                  value="generate"
                  checked={passphraseMode === 'generate'}
                  onChange={(e) => {
                    setPassphraseMode(e.target.value);
                    resetPassphrase();
                  }}
                  className="mr-3 text-blue-600"
                />
                <SafeIcon icon={FiZap} className="mr-2 text-gray-500" />
                <span className="text-gray-700">Generate passphrase</span>
              </label>
            </div>
          </motion.div>

          {/* Custom Passphrase Input */}
          <AnimatePresence>
            {passphraseMode === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Passphrase
                </label>
                <div className="relative">
                  <SafeIcon 
                    icon={FiKey} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <input
                    type="text"
                    value={customPassphrase}
                    onChange={(e) => setCustomPassphrase(e.target.value)}
                    placeholder="Enter your passphrase"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated Passphrase Length */}
          <AnimatePresence>
            {passphraseMode === 'generate' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Passphrase Length: {passphraseLength} characters
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={passphraseLength}
                    onChange={(e) => setPassphraseLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4</span>
                    <span>12</span>
                    <span>20</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleGeneratePassword}
              disabled={!name.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: name.trim() ? 0.98 : 1 }}
            >
              <SafeIcon icon={FiLock} />
              Password
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              onClick={handleGenerateNumber}
              disabled={!name.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: name.trim() ? 0.98 : 1 }}
            >
              <SafeIcon icon={FiHash} />
              Number
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={handleGenerateLettersOnly}
              disabled={!name.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: name.trim() ? 0.98 : 1 }}
            >
              <SafeIcon icon={FiAlignLeft} />
              UPPERCASE
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              onClick={handleGenerateLowercaseOnly}
              disabled={!name.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: name.trim() ? 0.98 : 1 }}
            >
              <SafeIcon icon={FiType} />
              lowercase
            </motion.button>
          </div>

          {/* Generated Passphrase Output */}
          <AnimatePresence>
            {generatedPassphrase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Passphrase
                </label>
                <div className="relative">
                  <input
                    type={showPassphrase ? "text" : "password"}
                    value={generatedPassphrase}
                    readOnly
                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl bg-blue-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowPassphrase(!showPassphrase)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title={showPassphrase ? "Hide passphrase" : "Show passphrase"}
                  >
                    <SafeIcon icon={showPassphrase ? FiEyeOff : FiEye} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Output */}
            <AnimatePresence>
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Generated Password
                  </label>
                  <div className="relative">
                    <textarea
                      value={password}
                      readOnly
                      rows={3}
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      style={{ display: showPassword ? 'block' : 'none' }}
                    />
                    <input
                      type="password"
                      value={password}
                      readOnly
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ display: showPassword ? 'none' : 'block' }}
                    />
                    <div className="absolute right-2 top-3 flex gap-1">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                      </button>
                      <button
                        onClick={handleCopyPassword}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy password"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="copied"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCheck} className="text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCopy} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="text-xs font-medium text-blue-600">Very Strong</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Number Output */}
            <AnimatePresence>
              {generatedNumber && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Generated Number
                  </label>
                  <div className="relative">
                    <input
                      type={showNumber ? "text" : "password"}
                      value={generatedNumber}
                      readOnly
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-green-50 font-mono text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="absolute right-2 top-3 flex gap-1">
                      <button
                        onClick={() => setShowNumber(!showNumber)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showNumber ? "Hide number" : "Show number"}
                      >
                        <SafeIcon icon={showNumber ? FiEyeOff : FiEye} />
                      </button>
                      <button
                        onClick={handleCopyNumber}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy number"
                      >
                        <AnimatePresence mode="wait">
                          {numberCopied ? (
                            <motion.div
                              key="copied"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCheck} className="text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCopy} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                  
                  {/* Number Properties */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="text-xs font-medium text-green-600">Deterministic</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Letters-Only Password Output */}
            <AnimatePresence>
              {lettersOnlyPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPPERCASE Letters (A-Z only)
                  </label>
                  <div className="relative">
                    <textarea
                      value={lettersOnlyPassword}
                      readOnly
                      rows={3}
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-amber-50 font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      style={{ display: showLettersOnly ? 'block' : 'none' }}
                    />
                    <input
                      type="password"
                      value={lettersOnlyPassword}
                      readOnly
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-amber-50 font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      style={{ display: showLettersOnly ? 'none' : 'block' }}
                    />
                    <div className="absolute right-2 top-3 flex gap-1">
                      <button
                        onClick={() => setShowLettersOnly(!showLettersOnly)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showLettersOnly ? "Hide password" : "Show password"}
                      >
                        <SafeIcon icon={showLettersOnly ? FiEyeOff : FiEye} />
                      </button>
                      <button
                        onClick={handleCopyLettersOnly}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy letters-only password"
                      >
                        <AnimatePresence mode="wait">
                          {lettersOnlyCopied ? (
                            <motion.div
                              key="copied"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCheck} className="text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCopy} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                  
                  {/* Letters-Only Password Properties */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="text-xs font-medium text-amber-600">Uppercase Only</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Lowercase-Only Password Output */}
            <AnimatePresence>
              {lowercaseOnlyPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    lowercase Letters (a-z only)
                  </label>
                  <div className="relative">
                    <textarea
                      value={lowercaseOnlyPassword}
                      readOnly
                      rows={3}
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-purple-50 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      style={{ display: showLowercaseOnly ? 'block' : 'none' }}
                    />
                    <input
                      type="password"
                      value={lowercaseOnlyPassword}
                      readOnly
                      className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-xl bg-purple-50 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      style={{ display: showLowercaseOnly ? 'none' : 'block' }}
                    />
                    <div className="absolute right-2 top-3 flex gap-1">
                      <button
                        onClick={() => setShowLowercaseOnly(!showLowercaseOnly)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showLowercaseOnly ? "Hide password" : "Show password"}
                      >
                        <SafeIcon icon={showLowercaseOnly ? FiEyeOff : FiEye} />
                      </button>
                      <button
                        onClick={handleCopyLowercaseOnly}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy lowercase-only password"
                      >
                        <AnimatePresence mode="wait">
                          {lowercaseOnlyCopied ? (
                            <motion.div
                              key="copied"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCheck} className="text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <SafeIcon icon={FiCopy} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                  
                  {/* Lowercase-Only Password Properties */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full w-full"></div>
                    </div>
                    <span className="text-xs font-medium text-purple-600">Lowercase Only</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Deterministic:</strong> Same inputs always produce identical results. 
              <span className="block mt-1">
                <strong>Password Types:</strong>
                <span className="text-indigo-700"> Standard (A-Z, a-z, 0-9, symbols)</span> | 
                <span className="text-amber-700"> UPPERCASE (A-Z only)</span> | 
                <span className="text-purple-700"> lowercase (a-z only)</span> | 
                <span className="text-green-700"> Numbers (0-9 only)</span>
              </span>
              {passphraseMode !== 'none' && (
                <span className="block mt-1">
                  <strong>Enhanced Security:</strong> Passphrase adds extra entropy for stronger protection.
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;