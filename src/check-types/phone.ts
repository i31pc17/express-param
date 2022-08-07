export default function (value: any) {
    const regexp = /[0-9]{2,4}\-?[0-9]{3,4}\-?[0-9]{3,4}/;
    const match = regexp.exec(value);
    if (!match || match.length === 0 || match[0] !== value) {
        return false;
    }
    return true;
};
