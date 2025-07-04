function toUTCString(dateStr) {
  // Check if already UTC format (ends with Z and no timezone offset)
  if (dateStr.endsWith('Z')) {
    return dateStr;
  }

  const date = new Date(dateStr);
  
  // Check for invalid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  return date.toISOString();
}

module.exports = toUTCString