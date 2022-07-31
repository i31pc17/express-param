export default function (value: any) {
    if ((value % 4) !== 0) {
        return false;
    }
    const regexp = /[a-z0-9+=\/]+/i;
    const match = regexp.exec(value);
    if (!match || match.length === 0 || match[0] !== value) {
        return false;
    }
    return true;
};