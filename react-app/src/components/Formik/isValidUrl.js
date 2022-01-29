export default function isValidUrl(url) {
    try {
        new URL(url);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
