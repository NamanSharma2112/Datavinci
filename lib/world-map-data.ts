import "server-only";
import DottedMap from "dotted-map";

/**
 * Builds the dotted world map on the server, so the ~340 KB of country data in
 * `dotted-map` never reaches the browser. Returns one compact SVG path (one
 * zero-length segment per dot, drawn with round caps) plus a projector that
 * snaps lat/lng onto the same grid, so arcs land exactly on the map.
 */
export function buildWorldMap() {
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const points = map.getPoints();

  // Group dots by row and use relative moves: ~6 bytes per dot instead of ~25.
  const rows = new Map<number, number[]>();
  for (const p of points) {
    const y = Math.round(p.y * 100) / 100;
    const row = rows.get(y);
    if (row) row.push(p.x);
    else rows.set(y, [p.x]);
  }
  let d = "";
  for (const [y, xs] of [...rows.entries()].sort((a, b) => a[0] - b[0])) {
    xs.sort((a, b) => a - b);
    d += `M${xs[0]} ${y}h0`;
    for (let i = 1; i < xs.length; i++) d += `m${+(xs[i] - xs[i - 1]).toFixed(2)} 0h0`;
  }

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const width = Math.ceil(Math.max(...xs) + 0.5);
  const height = Math.ceil(Math.max(...ys) + 0.5);

  const project = (lat: number, lng: number) => {
    const pin = map.getPin({ lat, lng });
    return pin ? { x: pin.x, y: pin.y } : { x: 0, y: 0 };
  };

  return { path: d, width, height, project };
}
