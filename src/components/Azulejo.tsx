// Componentes de azulejo usados no site. O desenho padrão é a Flor simples com
// rejunte; os outros desenhos guardados estão em AzulejoDesigns.tsx e podem ser
// passados pela prop `Tile` (use withJoint() para a versão com rejunte).
import type { ComponentType } from "react";
import { TileFlorComRejunte as DefaultTile } from "@/components/AzulejoDesigns";

type TileProps = { Tile?: ComponentType };

// Preenche o elemento pai (que precisa ser `relative`) com azulejos.
// `id` precisa ser único na página; `size` é o tamanho de cada azulejo em px.
export function AzulejoBackground({
  id,
  size = 96,
  className = "",
  Tile = DefaultTile,
}: { id: string; size?: number; className?: string } & TileProps) {
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} aria-hidden>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <svg viewBox="0 0 100 100" width={size} height={size} overflow="hidden">
            <Tile />
          </svg>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// Faixa horizontal de azulejos para separar seções.
export function AzulejoBand({ id, size = 48, Tile }: { id: string; size?: number } & TileProps) {
  return (
    <div className="relative w-full border-y-2 border-primary" style={{ height: size }}>
      <AzulejoBackground id={id} size={size} Tile={Tile} />
    </div>
  );
}

// Um azulejo isolado, para usar como ícone/ornamento.
export function AzulejoIcon({ className = "h-10 w-10", Tile = DefaultTile }: { className?: string } & TileProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <Tile />
      <rect width="100" height="100" fill="none" stroke="#667588" strokeWidth="4" />
    </svg>
  );
}

// Moldura de azulejos em volta do conteúdo.
export function AzulejoFrame({
  id,
  children,
  className = "",
  Tile,
}: { id: string; children: React.ReactNode; className?: string } & TileProps) {
  return (
    <div className={`relative border-2 border-primary p-4 ${className}`}>
      <AzulejoBackground id={id} size={32} Tile={Tile} />
      <div className="relative h-full border-2 border-primary bg-paper">{children}</div>
    </div>
  );
}
