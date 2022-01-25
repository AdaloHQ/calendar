// formats date with optional time
export const formatDate = (date, wantTime) => {
  const hours = date.getHours()
  const month = date.getMonth()
  const fullYear = date.getFullYear()
  const fullDate = date.getDate()
  const minutes = date.getMinutes()

  let datePush = fullYear + '-'
  if (month + 1 > 9) {
    datePush += month + 1
  } else {
    datePush += '0' + (month + 1)
  }
  if (fullDate > 9) {
    datePush += '-' + fullDate
  } else {
    datePush += '-0' + fullDate
  }
  if (wantTime) {
    if (hours > 9) {
      datePush += ' ' + hours
    } else {
      datePush += ' 0' + hours
    }
    if (minutes > 9) {
      datePush += ':' + minutes
    } else {
      datePush += ':0' + minutes
    }
  }
  return datePush
}
