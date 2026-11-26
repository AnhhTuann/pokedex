import type { ImgHTMLAttributes } from 'react';
import { useState } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> & { name: string; shiny?: boolean };

export function PokemonArtwork({ name, shiny, src, ...props }: Props) {
  const [failedSource, setFailedSource] = useState<string>();
  const available = src && src !== failedSource;
  return <img {...props} src={available ? src : undefined}
    alt={available ? name : `${name} — ${shiny ? 'Shiny' : 'Normal'} artwork unavailable`}
    onError={() => setFailedSource(src)} />;
}
