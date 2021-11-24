export const replaceMtag = (str) => {
    return str.replace(/mtag='(out|\d+)'/g, function (match, key) {
        let num = 1;
        try {
            num = parseInt(match.match(/\d/g).toString());
        }
        catch (e) {
            return "";
        }
        return `height="${num * 14}px"`;
    });
}
