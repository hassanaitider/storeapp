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
  countryFromLocationSettings,
  currencyForCountry,
  isStoreMarket,
  localeForCountry,
} = require("../src/lib/countries.ts");
const { formatLocalAmount, isCurrencyCode } = require("../src/lib/currency.ts");
const { pickText } = require("../src/lib/localized.ts");
const { getDictionary } = require("../src/lib/i18n.ts");

test("only Morocco and Lebanon remain active among the Arab markets", () => {
  for (const country of ["TN", "MR", "SA", "AE", "OM", "IQ", "LY"]) {
    assert.equal(isStoreMarket(country), false, `${country} should be inactive`);
  }

  for (const country of [
    "MA",
    "LB",
    "MX",
    "AR",
    "DO",
    "KE",
    "UG",
    "TZ",
    "ZM",
    "CM",
    "SN",
    "ML",
    "GN",
    "CI",
    "CD",
    "CG",
  ]) {
    assert.equal(isStoreMarket(country), true, `${country} should remain active`);
  }

  assert.equal(DEFAULT_COUNTRY, "MA");
  assert.deepEqual(STORE_MARKET_CODES.slice(0, 2), ["MA", "LB"]);
});

test("French-speaking African markets use French and supported local currencies", () => {
  const expectedCurrencies = {
    SN: "XOF",
    ML: "XOF",
    GN: "GNF",
    CI: "XOF",
    CD: "CDF",
    CG: "XAF",
  };

  for (const [country, currency] of Object.entries(expectedCurrencies)) {
    assert.equal(localeForCountry(country), "fr", country);
    assert.equal(currencyForCountry(country), currency, country);
    assert.equal(isCurrencyCode(currency), true, currency);
  }

  assert.equal(countryFromLocationSettings("Africa/Dakar"), "SN");
  assert.equal(countryFromLocationSettings(undefined, ["fr-CI"]), "CI");
  assert.equal(
    pickText({ nameFr: "Sénégal", nameEn: "Senegal" }, "name", "fr"),
    "Sénégal"
  );
  assert.match(formatLocalAmount(1500, "XOF", "fr"), /CFA/);
  assert.equal(getDictionary("fr").common.language, "Langue");
});
