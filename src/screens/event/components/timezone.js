export const language = "en-US";
export const timeZone = { timeZone: "Pacific/Auckland" };

//to initialize the date
export function getGlobalDate() {
  return new Date().toLocaleString(language, timeZone);
}

//for onChanging the date and convert it to the timzone
export function onChangeFormat(e) {
  const convertToUTC = e.toLocaleString(language, timeZone);
  console.log(convertToUTC);

  return convertToUTC;
}