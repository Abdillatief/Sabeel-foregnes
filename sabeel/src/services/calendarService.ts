export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
}

export function generateGoogleCalendarUrl(event: CalendarEventDetails): string {
  const startDateTime = new Date(`${event.startDate}T${event.startTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + event.durationMinutes * 60000);
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const dates = `${formatDate(startDateTime)}/${formatDate(endDateTime)}`;
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: dates,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateOutlookCalendarUrl(event: CalendarEventDetails): string {
  const startDateTime = new Date(`${event.startDate}T${event.startTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + event.durationMinutes * 60000);

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: startDateTime.toISOString(),
    enddt: endDateTime.toISOString(),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadAppleIcsFile(event: CalendarEventDetails) {
  const startDateTime = new Date(`${event.startDate}T${event.startTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + event.durationMinutes * 60000);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sabeel Academy//Online Quran Class//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@sabeelacademy.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDateTime)}`,
    `DTEND:${formatIcsDate(endDateTime)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Sabeel-Academy-Lesson-${event.startDate}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
