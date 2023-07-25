export async function searchPosts() {
  const userAgent =
    "portfolio redit clone:KMYvzwFdDvpecaPPyislaQ:1.0 (by /u/SubstantialLadder344)";
  const baseUrl = "https://www.reddit.com";
  const endpoint = "/search.json";
  const queryParams = `?q=gaming`;

  try {
    const response = await fetch(baseUrl + endpoint + queryParams, {
      method: "GET",
      headers: {
        "User-Agent": { userAgent },
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Reddit API");
    }
    return console.log('this was a success');

    const data = await response.json();
    return data.data.children.map((post) => post.data);
  } catch (error) {
    console.error("Error searching for posts:", error);
    return [];
  }
}
