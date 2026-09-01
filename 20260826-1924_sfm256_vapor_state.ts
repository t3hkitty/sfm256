/**
 * Zettelkasten ID: 20260826-1924
 * Project: sfm256-vapor
 * Role: Persistent state handlers tracking active cart items and satirical purchase status [cite: 324]
 */

import { useStickySetting } from '../state/meowState';

export function useVaporState() {
  const [activeCart, setActiveCart] = useStickySetting<string[]>('sfm256_vapor_cart', []);
  const [purchasedApps, setPurchasedApps] = useStickySetting<string[]>('sfm256_vapor_purchased', []);

  return {
    activeCart,
    setActiveCart,
    purchasedApps,
    setPurchasedApps
  };
}
