export default function (value: any) {
    const regexp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const match = regexp.exec(value);
    if (!match || match.length === 0 || match[0] !== value) {
        return false;
    }
    return true;
};
