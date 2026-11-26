import type { ImgHTMLAttributes } from 'react';
import { useState } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> & { name: string; shiny?: boolean };

export function PokemonArtwork({ name, shiny, src, ...props }: Props) {
  const [failedSource, setFailedSource] = useState<string>();
  const available = src && src !== failedSource;
  if (!available) {
    const message = `${shiny ? 'Shiny' : 'Normal'} artwork unavailable`;
    return <span role="img" aria-label={`${name} — ${message}`}
      className={['artwork-unavailable', props.className].filter(Boolean).join(' ')}
      style={props.style}>{message}</span>;
  }
  return <img {...props} src={src} alt={name} onError={() => setFailedSource(src)} />;
}
