let storedText: string | null = null;

export function setText(text: string): void {
  storedText = text;
}

export function getText(): string | null {
  return storedText;
}

export function clearText(): void {
  storedText = null;
}
