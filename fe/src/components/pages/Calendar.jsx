import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, 
         isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

  // Genera i giorni del mese corrente
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Gestione eventi
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setNewEvent(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...newEvent,
      dateTime: `${newEvent.date}T${newEvent.time}`
    };
    setAppointments([...appointments, newAppointment]);
    setShowEventModal(false);
    setNewEvent({ title: '', description: '', date: '', time: '' });
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => 
      format(parseISO(apt.dateTime), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="h-full">
      {/* Header Calendario */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Calendario Appuntamenti
        </h1>
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuovo Appuntamento
        </button>
      </div>

      {/* Controlli Mese */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">
          {format(currentDate, 'MMMM yyyy', { locale: it })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Griglia Calendario */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map(day => {
          const appointments = getAppointmentsForDate(day);
          return (
            <div
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={`
                min-h-[100px] p-2 border rounded-lg cursor-pointer
                ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : 'bg-white'}
                ${isSameDay(day, selectedDate) ? 'border-blue-500' : 'border-gray-200'}
                hover:border-blue-500
              `}
            >
              <div className="text-right">
                {format(day, 'd')}
              </div>
              <div className="mt-1">
                {appointments.map(apt => (
                  <div
                    key={apt.id}
                    className="text-sm p-1 mb-1 bg-blue-100 rounded truncate"
                    title={apt.title}
                  >
                    {format(parseISO(apt.dateTime), 'HH:mm')} - {apt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nuovo Appuntamento */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Nuovo Appuntamento</h3>
            <form onSubmit={handleAddEvent}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titolo
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descrizione
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ora
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.time}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;