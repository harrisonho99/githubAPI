window.API = {
    fetchPopularRepos(language) {
      // "language" can be "javascript", "ruby", "python", or "all"
      const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
      return fetch(encodedURI)
        .then((data) => data.json())
        .then((repos) => {
          console.log(repos.items)
          return repos.items})
        .catch((error) => {
          console.warn(error)
          return null
        });
    }
  }