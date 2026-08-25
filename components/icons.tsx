/**
 * Hand-drawn icon set. Nine icons, one consistent 1.5px stroke on a 16px grid.
 * Inlined rather than pulled from a library so the stroke weight matches the
 * type, and so no icon package ships in the bundle.
 */

type IconProps = React.SVGProps<SVGSVGElement>

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Stroke>
)

export const ArrowDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </Stroke>
)

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 11L11 5M6 5h5v5" />
  </Stroke>
)

export const Download = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 2v8M5 7.5l3 3 3-3M2.5 13h11" />
  </Stroke>
)

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.25" />
    <path d="M2.25 4.5L8 8.75l5.75-4.25" />
  </Stroke>
)

export const Plus = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 3.5v9M3.5 8h9" />
  </Stroke>
)

export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="8" cy="8" r="3.1" />
    <path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.95 3.05l-1.13 1.13M4.18 11.82l-1.13 1.13M12.95 12.95l-1.13-1.13M4.18 4.18L3.05 3.05" />
  </Stroke>
)

export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M13.4 9.6A5.8 5.8 0 016.4 2.6a5.8 5.8 0 107 7z" />
  </Stroke>
)

export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M2.5 5h11M2.5 11h11" />
  </Stroke>
)

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </Stroke>
)

/* --- Brand marks. Solid, drawn to their own proportions. ------------------ */

export const GitHub = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.34c-2.01.37-2.53-.49-2.7-.94-.09-.24-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.19c0 .21.15.46.55.38A8 8 0 008 0z" />
  </svg>
)

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M3.4 1.6a1.8 1.8 0 11-.01 3.61A1.8 1.8 0 013.4 1.6zM1.8 6.2h3.2v8H1.8v-8zM7 6.2h3.06v1.1h.04c.43-.78 1.47-1.6 3.02-1.6 3.23 0 3.83 2.03 3.83 4.67v4.83h-3.19v-4.28c0-1.02-.02-2.34-1.47-2.34-1.47 0-1.7 1.11-1.7 2.26v4.36H7v-9z" />
  </svg>
)

export const Apple = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M11.18 8.52c-.02-1.72 1.4-2.55 1.47-2.59-.8-1.17-2.05-1.33-2.49-1.35-1.06-.11-2.07.62-2.6.62-.54 0-1.36-.61-2.24-.59-1.15.02-2.21.67-2.8 1.7-1.19 2.07-.3 5.13.86 6.81.57.82 1.25 1.74 2.14 1.71.86-.04 1.18-.56 2.22-.56 1.03 0 1.33.56 2.24.54.92-.02 1.51-.84 2.07-1.66.65-.95.92-1.87.94-1.92-.02-.01-1.8-.69-1.81-2.71zM9.47 3.47c.47-.58.79-1.37.7-2.17-.68.03-1.5.45-1.99 1.02-.44.51-.82 1.32-.72 2.1.76.06 1.53-.38 2.01-.95z" />
  </svg>
)

export const GooglePlay = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M1.6 1.05a.9.9 0 00-.35.73v12.44c0 .3.13.56.35.73l6.6-6.95-6.6-6.95z" opacity=".78" />
    <path d="M11.03 5.06L8.75 3.75 2.13.74A.93.93 0 001.6 1.05L8.2 8l2.83-2.94z" />
    <path d="M11.03 10.94L8.2 8l-6.6 6.95c.16.12.36.15.53.06l6.62-3.01 2.28-1.06z" opacity=".62" />
    <path d="M11.03 5.06L8.2 8l2.83 2.94 2.85-1.63c.6-.34.6-1.28 0-1.62l-2.85-1.63z" opacity=".9" />
  </svg>
)
