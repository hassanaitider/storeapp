const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  module._compile(output.outputText, filename);
};

const {
  DEFAULT_COUNTRY,
  STORE_MARKET_CODES,
  isStoreMarket,
} = require("../src/lib/countries.ts");

test("only Morocco and Lebanon remain active among the Arab markets", () => {
  for (const country of ["TN", "MR", "SA", "AE", "OM", "IQ", "LY"]) {
    assert.equal(isStoreMarket(country), false, `${country} should be inactive`);
  }

  for (const country of ["MA", "LB", "MX", "AR", "DO", "KE", "UG", "TZ", "ZM", "CM"]) {
    assert.equal(isStoreMarket(country), true, `${country} should remain active`);
  }

  assert.equal(DEFAULT_COUNTRY, "MA");
  assert.deepEqual(STORE_MARKET_CODES.slice(0, 2), ["MA", "LB"]);
});
