import moment from 'moment';

export const getCalculateDuration = (startTime: string, endTime: string) => {

  const durationMs = getCalculateDurationWithNumberFormat(startTime, endTime)

  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  const formattedDuration = durationMinutes ? (` ${durationHours} h ${durationMinutes} m `) : ` ${durationHours} h `;

  return formattedDuration;
}

export const getDateWithFormat = (dateString: string, format: string) => {
  const dateObj = new Date(dateString ?? '')
  const isValid = !isNaN(dateObj.getTime())
  let date = ''
  if (isValid) {
    date = moment(dateObj.getTime()).format(format)
  }
  return date;
}

export const getAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const getTimeFormat = (time: string) => {
  const [hours, minutes] = time.split(':');
  const formattedHours = hours.padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');
  time = `${formattedHours}:${formattedMinutes}`;
  return time;
}

export const getCalculateDurationWithNumberFormat = (startTime: string, endTime: string) => {

  const [startHour, startMinute] = (startTime ?? '0:0').split(":") ?? ["0", "0"];
  const [endHour, endMinute] = (endTime ?? '0:0').split(":") ?? ["0", "0"];

  const startDate = new Date("1970-01-01");

  startDate.setHours(parseInt(startHour));
  startDate.setMinutes(parseInt(startMinute));
  startDate.setSeconds(0);

  const endDate = new Date("1970-01-01");
  endDate.setHours(parseInt(endHour));
  endDate.setMinutes(parseInt(endMinute));
  endDate.setSeconds(0);

  const durationMs = endDate.getTime() - startDate.getTime();

  return durationMs / (1000 * 60);
}



export const getDuration = (startTime: string, endTime: string) => {

  const startDate = new Date(`1970-01-01T${getTimeFormat(startTime)}:00`);
  const endDate = new Date(`1970-01-01T${getTimeFormat(endTime)}:00`);

  const diffInMs = endDate.getTime() - startDate.getTime();

  // const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  // const diffInSeconds = Math.floor((diffInMs / 1000) % 60);
  // const formattedMinutes = diffInMinutes.toString().padStart(2, '0');
  // const formattedSeconds = diffInSeconds.toString().padStart(2, '0');
  return Math.floor(diffInMs / (1000 * 60));
}

export const getDurationInDaysFromDate = (dateString: string) => {
  const parsedDate = new Date(dateString);
  const currentDate = new Date();

  const durationMs = currentDate.getTime() - parsedDate.getTime();
  const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  return durationDays;
}
export const getTodayDate = () => {
  const today = new Date();
  const formattedDate = moment(today).format('DD MMMM yyyy');
  const formattedDay = moment(today).format('dddd');
  console.log('formattedDay', formattedDay);
  return {
    day: formattedDay,
    date: formattedDate
  }
}

function isNumber(str: string): boolean {
  return !isNaN(Number(str));
}

export const convertTo12HourFormat = (time: string) => {
  let [hours, minutes] = time.split(':');
  hours = isNumber(hours) ? hours : "0";
  minutes = isNumber(minutes) ? minutes : "0";

  const formattedHours = hours.padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');


  time = `${formattedHours}:${formattedMinutes}`;
  const date = new Date(`1970-01-01T${time}:00`);

  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export const isValidTimeFormat = (input: string)=> {
  const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
  return timePattern.test(input);
}

export const isValidDateString = (dateStr: any) => {
  // return typeof dateStr === 'string' && !isNaN(new Date(dateStr).getTime())
  // return (typeof dateStr === 'string' && new Date(dateStr as string) as any !== "Invalid Date") && !isNaN(new Date(dateStr as string) as any);
  if(typeof dateStr !== 'string') return false;
  var formats = [
    moment.ISO_8601,
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD/MM/YYYY",
  ];
  return moment(dateStr, formats, true).isValid();
}


export const getRandomPastDate = ()=> {
  const currentDate = new Date();
  const twoMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, currentDate.getDate());
  const timeDiff = currentDate.getTime() - twoMonthsAgo.getTime();
  const randomTime = Math.floor(Math.random() * timeDiff);
  const randomDate = new Date(twoMonthsAgo.getTime() + randomTime);
  return randomDate;
}

export const addMinutesToTime = (time: string, minutesToAdd: number)=> {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const initialDate = new Date();
  initialDate.setHours(hours, minutes, 0, 0);

  const resultDate = new Date(initialDate.getTime() + minutesToAdd * 60000); // 1 minute = 60000 milliseconds

  const resultHours = resultDate.getHours();
  const resultMinutes = resultDate.getMinutes();

  return `${resultHours}:${resultMinutes < 10 ? '0' : ''}${resultMinutes}`;
}

export const formatRelativeTime= (timestamp:Date)=> {
  const now = new Date();
  const timeDiff = now.getTime() - timestamp.getTime();
  if (timeDiff < 60000) {
    return 'Just now';
  } else if (timeDiff < 3600000) {
    const minutes = Math.floor(timeDiff / 60000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDiff < 86400000) {
    const hours = Math.floor(timeDiff / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDiff < 604800000) {
    const days = Math.floor(timeDiff / 86400000);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDiff < 2592000000) {
    const weeks = Math.floor(timeDiff / 604800000);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const months = Math.floor(timeDiff / 2592000000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
}

export const convertTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours) % 12 || 12;
  const period = parseInt(hours) < 12 ? 'AM' : 'PM';
  return `${formattedHours}:${minutes} ${period}`;
}

export const getCurrentDateTimeString = (format) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedDate = format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

  return formattedDate;
}

export const dateIsValid=(date:any)=> date instanceof Date