import { motion } from 'framer-motion'

const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  rightElement,
  autoComplete,
  required = false,
  className = '',
  ...props
}) => {
  const active = Boolean(String(value ?? '').trim())

  return (
    <motion.label
      htmlFor={id}
      whileFocus={{ scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="group relative block"
    >
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        className={`peer w-full rounded-xl border border-[#D4AF37]/20 bg-[#0D0D0D]/70 px-4 pb-3 pt-6 text-sm text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#D4AF37]/80 focus:shadow-[0_0_0_1px_rgba(212,175,55,0.3),0_0_26px_rgba(212,175,55,0.2)] ${className}`.trim()}
        placeholder={label}
        {...props}
      />
      <span
        className={`pointer-events-none absolute left-4 top-4 text-xs text-[#A0A0A0] transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#D4AF37] ${active ? 'top-2 text-[10px] text-[#D4AF37]' : ''}`}
      >
        {label}
      </span>
      {rightElement ? <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span> : null}
    </motion.label>
  )
}

export default InputField