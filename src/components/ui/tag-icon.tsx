"use client";

import { IconProps } from "@tabler/icons-react";
import { IconTag } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";

export type IconSource = 
  | { type: 'tabler'; name: string }
  | { type: 'lucide'; name: string }
  | { type: 'svg'; path: string }
  | { type: 'emoji'; symbol: string };

interface TagIconProps extends Omit<IconProps, 'ref' | 'size'> {
  icon?: IconSource;
  size?: number;
}

const TablerIconMap = new Map<string, React.ComponentType<IconProps>>();
const LucideIconMap = new Map<string, React.ComponentType<IconProps>>();

export function TagIcon({ icon, className, size = 24, ...props }: TagIconProps) {
  const [IconComponent, setIconComponent] = React.useState<React.ComponentType<IconProps> | null>(null);

  React.useEffect(() => {
    async function loadIcon() {
      if (!icon) {
        setIconComponent(() => IconTag);
        return;
      }

      try {
        switch (icon.type) {
          case 'tabler': {
            const cachedIcon = TablerIconMap.get(icon.name);
            if (cachedIcon) {
              setIconComponent(() => cachedIcon);
              return;
            }

            const mod = await import('@tabler/icons-react');
            const Component = mod[`Icon${icon.name}` as keyof typeof mod] as React.ComponentType<IconProps>;
            if (Component) {
              TablerIconMap.set(icon.name, Component);
              setIconComponent(() => Component);
            } else {
              setIconComponent(() => IconTag);
            }
            break;
          }
          case 'lucide': {
            const cachedIcon = LucideIconMap.get(icon.name);
            if (cachedIcon) {
              setIconComponent(() => cachedIcon);
              return;
            }

            const mod = await import('lucide-react');
            const Component = mod[icon.name as keyof typeof mod] as React.ComponentType<IconProps>;
            if (Component) {
              LucideIconMap.set(icon.name, Component);
              setIconComponent(() => Component);
            } else {
              setIconComponent(() => IconTag);
            }
            break;
          }
          case 'svg':
            setIconComponent(() => ({ ...props }) => (
              <div 
                className={cn("relative inline-block", className)} 
                style={{ width: size, height: size }}
              >
                <Image
                  src={icon.path}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            ));
            break;
          case 'emoji':
            setIconComponent(() => ({ ...props }) => (
              <span 
                className={cn("inline-flex items-center justify-center", className)} 
                style={{ fontSize: size * 0.8, width: size, height: size, lineHeight: 1 }}
              >
                {icon.symbol}
              </span>
            ));
            break;
          default:
            setIconComponent(() => IconTag);
        }
      } catch {
        setIconComponent(() => IconTag);
      }
    }

    loadIcon();
  }, [icon, className, size]);

  if (!IconComponent) {
    return <IconTag className={className} size={size} {...props} />;
  }

  return <IconComponent className={className} size={size} {...props} />;
}
