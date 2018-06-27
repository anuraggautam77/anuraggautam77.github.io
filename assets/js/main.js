(function () {
  var config = {
    userId : 'anuraggautam77',
    repoUrl: 'https://api.github.com/users/anuraggautam77/repos'
  };

  function fetchRepos() {
    fetch(config.repoUrl)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function (repos) {
            createReportCard(repos);
          //  listRepos(repos);
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  function createReportCard(repos) {
    let report = {
      star: 0,
      watch: 0,
      fork: 0
    }

    repos.map(function(repo){
      if(!repo.fork) {
        report.star += repo.stargazers_count;
        report.watch += repo.watchers_count;
        report.fork += repo.forks_count;
      }
    })

    //diplay
    let reportEl = document.getElementById('report_card');
    let template = `
    <div>
        <div class="card mb-3">
    
          <div class="card-body">
          <h4 class="card-title">
          <i class="fa fa-bar-chart"></i> Github Stats</h4>
          </h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span style="font-size:1.5em; margin-right:60px">
                <i class="fa fa-star text-warning"></i> ${report.star}
              </span>
              <span style="font-size:1.5em; margin-right:60px">
                <i class="fa fa-eye text-primary"></i> ${report.watch}
              </span>
              <span style="font-size:1.5em; margin-right:60px">
                <i class="fa fa-code-fork text-secondary"></i> ${report.fork}
              </span>
          </li>
          </ul>
          </div>
        </div>
    </div>`;
    reportEl.innerHTML = template;
  }

  function listRepos(repos) {
    let repoListEl = document.getElementById('repo_list');
    let template = `<li class="list-group-item">
      <a href="https://github.com/prashant-andani/AR-Alphabets-words">AR Alphabets</a> - Web Augment Reality app for learning Alphabet words for Kids
    </li>`;
    repos.forEach(repo => {
      if(repo.fork === false) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<a href="${repo.html_url}">${repo.name}</a> 
        <p>${repo.description !==null ? repo.description : ''}</p>`;
        repoListEl.appendChild(li); 
      } 
    });
  }
  fetchRepos();
})();
