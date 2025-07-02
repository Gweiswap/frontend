// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  entry: {
    evm: "evm/index.ts"
  },
  format: ["esm", "cjs"],
  external: ["@pancakeswap/swap-sdk-core"],
  dts: true
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiB7XG4gICAgZXZtOiAnZXZtL2luZGV4LnRzJyxcbiAgfSxcbiAgZm9ybWF0OiBbJ2VzbScsICdjanMnXSxcbiAgLy8gRklYTUUgbm90IHN1cmUgd2h5IGNvcmUgd2lsbCBiZSBidW5kbGVkIGlmIG5vdCBzcGVjaWZ5IGV4cGxpY2l0bHlcbiAgZXh0ZXJuYWw6IFsnQHBhbmNha2Vzd2FwL3N3YXAtc2RrLWNvcmUnXSxcbiAgZHRzOiB0cnVlLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxRQUFRLENBQUMsT0FBTyxLQUFLO0FBQUEsRUFFckIsVUFBVSxDQUFDLDRCQUE0QjtBQUFBLEVBQ3ZDLEtBQUs7QUFDUCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
