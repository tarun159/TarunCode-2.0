import { CanvasParticleField } from '@/components/CanvasParticleField';
import '@/styles/canvasParticleField.css';

/**
 * Admin User Activity page background.
 *
 * Thin wrapper around the reusable CanvasParticleField. Kept as its own
 * component so the Admin page import (`<AdminRain />`) is untouched and its
 * exact appearance (120–180 desktop / 50–90 mobile particles, same palette,
 * depth, glow, twinkle, fade and reduced-motion behavior) is preserved. The
 * visual system itself now lives in CanvasParticleField and is shared with the
 * PC Lab and IoT Lab pages. No auth/Firebase/data changes here.
 */
export function AdminRain() {
  return <CanvasParticleField densityDesktop={[120, 180]} densityMobile={[50, 90]} />;
}
