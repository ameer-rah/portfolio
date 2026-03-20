import { useState, useEffect } from 'react';

export function useTypingEffect(lines: string[], speed = 60) {
  const [output, setOutput] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const reset = setTimeout(() => {
        setOutput('');
        setLineIdx(0);
        setCharIdx(0);
      }, 3000);
      return () => clearTimeout(reset);
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setOutput(prev => prev + line[charIdx]);
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setOutput(prev => prev + '\n');
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [lines, lineIdx, charIdx, speed]);

  return output;
}
