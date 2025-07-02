// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  entry: {
    index: "src/index.ts",
    "connectors/miniProgram": "connectors/miniProgram/index.ts",
    "connectors/binanceWallet": "connectors/binanceWallet/index.ts",
    "connectors/blocto": "connectors/blocto/index.ts",
    chains: "chains/index.ts"
  },
  format: ["esm", "cjs"],
  dts: true
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiB7XG4gICAgaW5kZXg6ICdzcmMvaW5kZXgudHMnLFxuICAgICdjb25uZWN0b3JzL21pbmlQcm9ncmFtJzogJ2Nvbm5lY3RvcnMvbWluaVByb2dyYW0vaW5kZXgudHMnLFxuICAgICdjb25uZWN0b3JzL2JpbmFuY2VXYWxsZXQnOiAnY29ubmVjdG9ycy9iaW5hbmNlV2FsbGV0L2luZGV4LnRzJyxcbiAgICAnY29ubmVjdG9ycy9ibG9jdG8nOiAnY29ubmVjdG9ycy9ibG9jdG8vaW5kZXgudHMnLFxuICAgIGNoYWluczogJ2NoYWlucy9pbmRleC50cycsXG4gIH0sXG4gIGZvcm1hdDogWydlc20nLCAnY2pzJ10sXG4gIGR0czogdHJ1ZSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsMEJBQTBCO0FBQUEsSUFDMUIsNEJBQTRCO0FBQUEsSUFDNUIscUJBQXFCO0FBQUEsSUFDckIsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQSxFQUNyQixLQUFLO0FBQ1AsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
