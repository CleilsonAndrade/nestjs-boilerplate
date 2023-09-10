export function addLeadingCharacters(
  input: string,
  lengthAdd: number,
  lengthCompare: number,
  character: string = '0',
): string {
  if (input.length < lengthCompare) {
    const charactersToAdd = character.repeat(lengthAdd) + input;
    return charactersToAdd;
  }

  return input;
}
