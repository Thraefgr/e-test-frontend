export default function dateConverter(date) {
    const converted = date.slice(0, date.indexOf("T"));
    return converted;
}