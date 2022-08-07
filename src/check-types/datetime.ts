export default function (value: any) {
    const regexp = /[0-9]{4}-?(0[1-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])\s([01][0-9]|2[0-3]):?([0-5][0-9])?:([0-5][0-9])/;
    const match = regexp.exec(value);
    if (!match || match.length === 0 || match[0] !== value) {
        return false;
    }
}