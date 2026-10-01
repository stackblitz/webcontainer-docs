export interface DiffLine {
  kind: 'same' | 'add' | 'remove';
  text: string;
}

/** Line diff via LCS. Fine for the small files in the demo trace. */
export function diffLines(before: string, after: string): DiffLine[] {
  const a = before.trimEnd().split('\n');
  const b = after.trimEnd().split('\n');

  if (!before) {
    return b.map((text) => ({ kind: 'add', text }));
  }

  // lcs[i][j] = length of the LCS of a[i..] and b[j..]
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;

  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      result.push({ kind: 'same', text: a[i++] });
      j++;
    } else if (i < a.length && (j === b.length || lcs[i + 1][j] >= lcs[i][j + 1])) {
      result.push({ kind: 'remove', text: a[i++] });
    } else {
      result.push({ kind: 'add', text: b[j++] });
    }
  }

  return result;
}

/** Collapses unchanged runs longer than `context * 2` lines into a `null` marker. */
export function withContext(lines: DiffLine[], context = 3): (DiffLine | null)[] {
  const keep = lines.map(() => false);

  lines.forEach((line, index) => {
    if (line.kind !== 'same') {
      for (let k = Math.max(0, index - context); k <= Math.min(lines.length - 1, index + context); k++) {
        keep[k] = true;
      }
    }
  });

  const result: (DiffLine | null)[] = [];

  lines.forEach((line, index) => {
    if (keep[index]) {
      result.push(line);
    } else if (result[result.length - 1] !== null) {
      result.push(null);
    }
  });

  return result;
}
