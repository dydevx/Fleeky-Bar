# Fleeky Bar — editorial direction

## Approved direction

The October 2026 brief authorizes a full visual redesign: bold, rebellious,
dark glam, liquid chrome, Y2K and independent fashion-editorial identity.
Purposeful overlap is welcome; booking and business information stay clear.

## Visual system

- Dark ink `#130811`, deep plum `#40152f`, plum highlight `#5f204b`.
- Rose `#f092dc`, chrome `#dcd3de`, paper white `#fff9fe`.
- Self-hosted Caprasimo for bold, rounded retro headlines and brand wordmarks,
  following the user's Creamy Sugar Bold visual reference; native Bodoni/Didot
  serif for italic contrast; Helvetica/Arial for functional copy; a restrained
  handwritten accent for print captions. Caprasimo's OFL license is bundled.
  Display sizes are tuned to its wider letterforms. Rose brand lettering has
  a restrained dimensional highlight; practical copy stays in the sans face.
- Four-point SVG sparkles separate marquee phrases. Direction arrows are SVGs
  with currentColor; decorative icons never rely on platform emoji rendering.
- Rectangular buttons and fine rules. No pill-shaped service cards.
- Actual studio work provides the evidence. The existing liquid-metal hand is
  decorative, never presented as a client result. No standalone FB monogram
  in page content; the existing Logo.jpeg is retained as the requested favicon.
- Hero layers the large Fleeky wordmark behind tilted real photography, with
  solid rose Bar in front, matching the photo border. The gallery is a
  collection of overlapping prints.
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

### Rebellious motion details

- The hero is a cut-and-paste poster assembly: the Fleeky/Bar shadow layers
  briefly separate and register again, the caption lands like a pasted sticker,
  and three small chrome glints turn once. The photo repeats the layer/glint
  accent on mouse entry or touch, with a 1.6-second cooldown.
- Gallery prints slide into their existing opposing rotations once on entry.
  Chrome sheen crosses a print on hover or keyboard focus. Campaign words get
  a drawn underline; the existing nail-art stamp lands once when scrolled into view.
- Link arrows cut forward on hover/focus, and the footer wordmark briefly gets
  a displaced print shadow. All accents are finite and use native CSS/WAAPI.
- Keep natural photo colours, content visibility, existing booking interactions,
  keyboard access and reduced-motion support. Cancel finite JS motion when the
  tab is hidden. Add no continuous render loop or animation dependency.

## Invariants

Preserve prices, service descriptions, hours, address, phone, both social URLs,
Salonized booking links and the exact prominent credit “Door HoangCaster”.
Check narrow mobile, tablet and wide desktop. Do not equate DOM tests with
visual browser verification.

## Approved rebellious poster refinement

Preserve the original dark-glam, Y2K editorial collage. Amplification happens
inside that composition and the existing palette, fonts and rectangular forms.

- Keep Fleeky Bar as the hero headline, with a displaced chrome outline behind
  the rose Fleeky lettering and a larger solid rose Bar across the foreground.
- Tilt the main real nail print more decisively; retain the smaller chrome detail
  print on desktop and enlarge the liquid-metal sculpture at the left.
- Keep the italic "Good nails. Bad attitude." print caption and clear booking row.
- Restore the stepped manifesto and overlapping, independently focused gallery
  prints. Increase photographic scale and opposing rotations within that language.
- Keep the rose nail-art campaign panel and clear pricing/business information.
- Use one finite title/photo assembly, fine-pointer photo tilt and hover sheen.
  All motion supports reduced motion and the page stays visible without JavaScript.

## Nail photography finish

- Present real nail photography with the source photographs' natural skin tones.
  Do not apply whole-image brightness, contrast, saturation or colour grading.
  Preserve original polish and chrome detail across hero, service previews,
  gallery, social photography and the full-size lookbook. Any future polish
  enhancement must be isolated to the nails without altering skin.
- Crop the pink chrome hero closer to the nails, at 50% / 60%, with a 1.12 scale.
  Its entrance ends at that same scale, including when motion is reduced.
- Keep the source photographs unchanged.
- Fill Bar in rose `#f092dc`, matching the hero photo border, with a fine pale
  edge and the same front-face highlight and rose shadow as Fleeky. Add a pale
  pink/chrome duplicate offset down and right with stacked rose/plum shadows
  and a soft dark cast shadow, matching the reference's dimensional lettering.
  Scale the offset with the lettering on desktop, tablet and mobile; hide the
  decorative duplicate in forced-colour mode and from assistive technology.
