

let promiseRlibMml: Promise<any>;
export const getRlibMml = async () => {
  if (!promiseRlibMml) {
    const hModule = require("../../rlib-MML/wasm/build/rlibmml.js");
    promiseRlibMml = hModule();
  }
  const instance = await promiseRlibMml;

  return {
    mmlToSmf: (mml: string) => {
      const r = instance.mmlToSmf(mml) as {
        result: Uint8Array;
        message?: undefined;
      } | {
        result: undefined;
        message: string;
      };
      if (!r.result) throw new Error(r.message);
      return r.result;
    },
    smfToMml: (smf: Uint8Array) => {
      const r = instance.smfToMml(smf) as {
        result: string;
        message?: undefined;
      } | {
        result: undefined;
        message: string;
      };
      if (!r.result) throw new Error(r.message);
      return r.result;
    },
  };
};

