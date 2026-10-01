# Fleeky Bar — editorial direction

## Approved direction

The October 2026 brief authorizes a full visual redesign: bold, rebellious,
dark glam, liquid chrome, Y2K and independent fashion-editorial identity.
Purposeful overlap is welcome; booking and business information stay clear.

## Visual system

- Dark ink `#130811`, deep plum `#40152f`, plum highlight `#5f204b`.
- Rose `#f092dc`, chrome `#dcd3de`, paper white `#fff9fe`.
- Self-hosted Anton for campaign-scale condensed headlines; native Bodoni/Didot
  serif for italic contrast; Helvetica/Arial for functional copy; a restrained
  handwritten accent for print captions. Anton's OFL license is bundled.
- Rectangular buttons and fine rules. No pill-shaped service cards.
- Actual studio work provides the evidence. The existing liquid-metal hand is
  decorative, never presented as a client result. No standalone FB monogram
  in page content; the existing Logo.jpeg is retained as the requested favicon.
- Hero layers large typography behind a tilted real photo, with outline type
  in front. The gallery is a curated, labeled collection of overlapping prints.
- Nail art and social photography have explicit heights; intrinsic image sizes
  must never dictate section heights.

## Motion and interaction

- Finite, one-time mask reveals and alternating word entrances.
- Two slow marquee ribbons, each independently pausable; static and scrollable
  with reduced motion or without JavaScript. Hidden duplicates are inert.
- Fine-pointer desktop only: supplemental cursor, restrained photo tilt, and
  two decorative objects drifting at most 40px. Preserve the native cursor.
- Native dialog for gallery, with previous/next, arrow keys, Escape and focus
  restoration. Hover effects never gate access to labels or links.
- No scroll hijacking, continuous JS animation loop or motion library.
- Reduced motion disables entrances, parallax, cursor, tilt and marquee motion.

## Invariants

Preserve prices, service descriptions, hours, address, phone, both social URLs,
Salonized booking links and the exact prominent credit “Door HoangCaster”.
Check narrow mobile, tablet and wide desktop. Do not equate DOM tests with
visual browser verification.
