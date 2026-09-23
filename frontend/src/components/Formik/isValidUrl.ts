export default function isValidUrl(url: string) {
    try {
        new URL(url);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
