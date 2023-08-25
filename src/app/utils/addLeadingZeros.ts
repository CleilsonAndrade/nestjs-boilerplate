export function addLeadingZeros(input: string, length: number): string {
  if (input.length < length) {
    const zerosToAdd = length - input.length;
    return '0'.repeat(zerosToAdd) + input;
  }

  return input;
}
