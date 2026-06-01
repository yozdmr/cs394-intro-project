const DAY_PATTERN = /^([A-Za-z]+)\s+(\d+:\d+)-(\d+:\d+)$/;

const parseDays = (dayStr: string): string[] => {
  const days: string[] = [];
  let i = 0;
  while (i < dayStr.length) {
    if (i + 1 < dayStr.length && dayStr[i] === 'T' && dayStr[i + 1] === 'u') {
      days.push('Tu');
      i += 2;
    } else if (i + 1 < dayStr.length && dayStr[i] === 'T' && dayStr[i + 1] === 'h') {
      days.push('Th');
      i += 2;
    } else if (i + 1 < dayStr.length && dayStr[i] === 'S' && dayStr[i + 1] === 'a') {
      days.push('Sa');
      i += 2;
    } else if (i + 1 < dayStr.length && dayStr[i] === 'S' && dayStr[i + 1] === 'u') {
      days.push('Su');
      i += 2;
    } else {
      days.push(dayStr[i]);
      i += 1;
    }
  }
  return days;
};

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

interface ParsedMeeting {
  days: string[];
  start: number;
  end: number;
}

const parseMeeting = (meets: string): ParsedMeeting | null => {
  if (!meets) return null;
  const match = meets.match(DAY_PATTERN);
  if (!match) return null;
  return {
    days: parseDays(match[1]),
    start: toMinutes(match[2]),
    end: toMinutes(match[3]),
  };
};

const timesOverlap = (a: ParsedMeeting, b: ParsedMeeting): boolean => {
  const sharedDay = a.days.some(d => b.days.includes(d));
  if (!sharedDay) return false;
  return a.start < b.end && b.start < a.end;
};

export const hasConflict = (
  meets: string,
  term: string,
  selectedMeetings: { meets: string; term: string }[]
): boolean => {
  const parsed = parseMeeting(meets);
  if (!parsed) return false;

  return selectedMeetings.some(sel => {
    if (sel.term !== term) return false;
    const selParsed = parseMeeting(sel.meets);
    if (!selParsed) return false;
    return timesOverlap(parsed, selParsed);
  });
};
