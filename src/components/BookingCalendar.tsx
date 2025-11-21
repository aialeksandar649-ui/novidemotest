import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingCalendarProps {
  onDatesSelect: (start: Date, end: Date) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export default function BookingCalendar({ onDatesSelect, initialStartDate, initialEndDate }: BookingCalendarProps) {
  const { language } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (initialStartDate) {
      return new Date(initialStartDate.getFullYear(), initialStartDate.getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate || null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate || null);

  useEffect(() => {
    setStartDate(initialStartDate || null);
    setEndDate(initialEndDate || null);
  }, [initialStartDate, initialEndDate]);

  const monthNames = language === 'sr' 
    ? ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'sr'
    ? ['Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su', 'Ne']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = firstDay.getDay();
    // Adjust for Monday as first day (0 = Sunday, so 0 becomes 6, 1 becomes 0, etc.)
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isPastDate = (day: number, month: Date) => {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day: number, month: Date) => {
    if (!day) return false;
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
      if (date.getTime() === startDate.getTime()) return true;
    }
    if (endDate) {
      endDate.setHours(0, 0, 0, 0);
      if (date.getTime() === endDate.getTime()) return true;
    }
    return false;
  };

  const isDateInRange = (day: number, month: Date) => {
    if (!day || !startDate || !endDate) return false;
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return date > startDate && date < endDate;
  };

  const isToday = (day: number, month: Date) => {
    if (!day) return false;
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (day: number, month: Date) => {
    if (!day) return;
    const selectedDate = new Date(month.getFullYear(), month.getMonth(), day);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (isPastDate(day, month)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
        onDatesSelect(startDate, selectedDate);
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
      }
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-10"></div>;
          }
          
          const isPast = isPastDate(day, currentMonth);
          const isSelected = isDateSelected(day, currentMonth);
          const inRange = isDateInRange(day, currentMonth);
          const isTodayDate = isToday(day, currentMonth);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day, currentMonth)}
              disabled={isPast}
              className={`
                h-10 w-10 rounded-lg text-sm font-medium transition-colors
                ${isPast 
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50' 
                  : isSelected
                    ? 'bg-[#FF385C] text-white hover:bg-[#E61E4D]'
                    : inRange
                      ? 'bg-[#FF385C]/20 dark:bg-[#FF385C]/30 text-gray-900 dark:text-gray-100'
                      : isTodayDate
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
