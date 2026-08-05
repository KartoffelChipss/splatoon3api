/**
 * Convert an rgba()/rgb() string to a hex color.
 * Borrowed from https://stackoverflow.com/a/73401564
 */
export function RGBAtoHEX(rgba: string, forceRemoveAlpha: boolean = false): string {
    return (
        '#' +
        rgba
            .replace(/^rgba?\(|\s+|\)$/g, '')
            .split(',')
            .filter((_, index) => !forceRemoveAlpha || index !== 3)
            .map((value) => parseFloat(value))
            .map((value, index) => (index === 3 ? Math.round(value * 255) : value))
            .map((value) => value.toString(16))
            .map((value) => (value.length === 1 ? '0' + value : value))
            .join('')
    );
}
