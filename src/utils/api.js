export const BASE_URL = "https://codeforces.com";

export function USER_STATUS(username) {
  return `${BASE_URL}/api/user.status?handle=${username}`;
}

export function GET_SUBMISSIONS_BY_CONTEST(contestId, numberOfSubmissions) {
  return `${BASE_URL}/api/contest.status?contestId=${contestId}&from=1&count=${numberOfSubmissions}`;
}

export function GET_USER_RATINGS(usernames) {
  return `${BASE_URL}/api/user.info?handles=${usernames}`;
}
export function GET_RATING_GRAPH(username) {
  return `${BASE_URL}/api/user.rating?handle=${username}`;
}
