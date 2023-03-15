import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export function formatDate(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).utcOffset(8).format(format)
}
