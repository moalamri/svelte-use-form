import type { ValidationErrors } from "./models/validator";

export function required(value: string): null | ValidationErrors {
  return value.trim() ? null : { required: "Required" };
}

export function maxLength(length: number) {
  return function (value: string): null | ValidationErrors {
    return value.trim().length <= length ? null : { maxLength: length };
  };
}

export function minLength(length: number) {
  return function (value: string): null | ValidationErrors {
    return value.trim().length >= length ? null : { minLength: length };
  };
}

export function email(value: string): null | ValidationErrors {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return null;
  }
  return { email: {} };
}

export function url(value: string): null | ValidationErrors {
  // https://stackoverflow.com/a/5717133/13475809
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  if (pattern.test(value)) {
    return null;
  }
  return { url: "URL is not valid" };
}

export function number(value: string): null | ValidationErrors {
  if (/^[0-9]+$/.test(value)) {
    return null;
  }
  return { number: {} };
}

export function pattern(regExp: string | RegExp) {
  const r = typeof regExp === "string" ? new RegExp(regExp) : regExp;
  return (value: string): null | ValidationErrors => {
    return r.test(value) ? null : { pattern: "Pattern error" };
  };
}
