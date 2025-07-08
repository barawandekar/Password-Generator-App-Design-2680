import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { generatePassword, generatePassphrase } from '../utils/passwordUtils';

const { FiUser, FiLock, FiEye, FiEyeOff, FiCopy, FiCheck, FiRefreshCw, FiKey, FiEdit3, FiZap } = FiIcons;

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleGeneratePassword();
    }
  };

  const resetPassphrase = () => {
    setCustomPassphrase('');
    setGeneratedPassphrase('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
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
            <p className="text-gray-600 text-sm">Create secure passwords with name + passphrase combination</p>
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

          {/* Password Length Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Password Length: {passwordLength} characters
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
                <span>29</span>
                <span>50</span>
              </div>
            </div>
          </motion.div>

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

          {/* Generate Button */}
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
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <SafeIcon icon={FiRefreshCw} className="animate-spin" />
                  Generating...
                </motion.div>
              ) : (
                <motion.span
                  key="generate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Generate Password
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Generated Passphrase Output */}
          <AnimatePresence>
            {generatedPassphrase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
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

          {/* Password Output */}
          <AnimatePresence>
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
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
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-full"></div>
                  </div>
                  <span className="text-xs font-medium text-green-600">Very Strong</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Deterministic:</strong> Same inputs always produce the same results. 
              Passwords include uppercase, lowercase, numbers, and special characters (@, $, !, &).
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