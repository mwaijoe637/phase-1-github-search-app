document.getElementById('github-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('search').value;
    const searchUrl = `https://api.github.com/search/users?q=${searchInput}`;
    
    try {
      const response = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      const users = data.items; 
      
      
      document.getElementById('user-list').innerHTML = '';
      
      
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.login;
        listItem.addEventListener('click', () => {
          showUserRepositories(user.login);
        });
        document.getElementById('user-list').appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  async function showUserRepositories(username) {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    
    try {
      const response = await fetch(reposUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const repos = await response.json();
      
      
      document.getElementById('repos-list').innerHTML = '';
      
      
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.name;
        document.getElementById('repos-list').appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
  