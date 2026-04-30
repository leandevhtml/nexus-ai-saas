"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Database,
  History,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Início",     href: "/app",              icon: LayoutDashboard },
  { name: "Gerador",    href: "/app/ia",            icon: Sparkles        },
  { name: "Treinar",    href: "/app/treinamento",   icon: Database        },
  { name: "Histórico",  href: "/app/historico",     icon: History         },
  { name: "Configurar", href: "/app/configuracoes", icon: Settings        },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @keyframes nav-bounce {
          0%   { transform: scale(1)    translateY(0);  }
          35%  { transform: scale(1.2)  translateY(-3px); }
          65%  { transform: scale(0.92) translateY(1px);  }
          100% { transform: scale(1)    translateY(0);  }
        }
        @keyframes pill-in {
          from { opacity: 0; transform: scaleX(0.4); }
          to   { opacity: 1; transform: scaleX(1);   }
        }
        .nav-icon-active {
          animation: nav-bounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .nav-pill {
          animation: pill-in 0.25s ease both;
          transform-origin: center;
        }
      `}</style>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_16px_rgba(0,0,0,0.4)]">
        <div className="flex h-16">
          {navItems.map((item) => {
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center flex-1 gap-1 select-none"
              >
                {/* Pill indicator */}
                {isActive && (
                  <span className="nav-pill absolute top-2.5 w-10 h-7 rounded-full bg-indigo-100 dark:bg-indigo-500/20" />
                )}

                {/* Icon */}
                <item.icon
                  key={`icon-${isActive}`}
                  className={`relative z-10 w-5 h-5 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 nav-icon-active"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />

                {/* Label */}
                <span
                  className={`relative z-10 text-[10px] font-semibold leading-none ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {item.name}
                </span>

                {/* Active dot */}
                {isActive && (
                  <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
