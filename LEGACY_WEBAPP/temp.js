const url = "https://codeforces.com/profile/hitvrth"
const regex = /(\d+|[A-Za-z]\d+).*\/([A-Za-z]\d*)$/;
const match = url.match(regex);
if(match) console.log({ number: match[1], index: match[2].toUpperCase() });

