

/**
 * Formats a date as "Month DD, YYYY".
 * @param date - The date to format.
 * @returns A string representing the formatted date.
 */
export function formatDateUS(date: Date): string {
  const parseDate = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return parseDate.toLocaleDateString('en-US', options);
  }