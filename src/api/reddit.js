const rootURL = 'https://www.reddit.com'

export const getPosts = async (searchTerm) => {
    const reponse = await fetch(`${rootURL}/search.json?q=${searchTerm}`)
    const json = await reponse.json();
    return json.data.children.map((post) => post.data)
};

export const getSubReddits = async () => {
    const reponse = await fetch(`${rootURL}/subreddits.json`)
    const json = await reponse.json();
    return json.data.children.map((subReddit) => subReddit.data)
}

export const getPostComments = async (permalink) => {
    const response = await fetch(`${rootURL}${permalink}.json`);
    const json = await response.json();
  
    return json[1].data.children.map((subreddit) => subreddit.data);
  };