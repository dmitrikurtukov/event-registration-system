export default function formatEventTime(eventTime: string): string {
  return new Date(eventTime).toLocaleString();
}
