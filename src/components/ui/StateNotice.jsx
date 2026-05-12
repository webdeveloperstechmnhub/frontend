import { MotionItem } from './MotionSystem'

const styles = {
  loading: 'border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]',
  empty: 'border-[#D4AF37]/20 bg-[#111111] text-[#A0A0A0]',
  error: 'border-[#D4AF37]/20 bg-[#111111]/12 text-[#A0A0A0]',
  success: 'border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#D4AF37]',
}

const labels = {
  loading: 'Loading...',
  empty: 'No data found.',
  error: 'Something went wrong.',
  success: 'Completed successfully.',
}

const StateNotice = ({ type = 'empty', message }) => {
  const currentType = styles[type] ? type : 'empty'
  return (
    <MotionItem className={`rounded-xl border px-4 py-3 text-sm ${styles[currentType]}`} role={currentType === 'error' ? 'alert' : 'status'}>
      {message || labels[currentType]}
    </MotionItem>
  )
}

export default StateNotice
