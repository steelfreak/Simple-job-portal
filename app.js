const jobsListDiv = document.getElementById('jobs-list');
const jobSearchInput = document.getElementById('job-search-input');

function renderJobs(jobsToRender) {
  jobsListDiv.innerHTML = '';
  if (jobsToRender.length === 0) {
    jobsListDiv.innerHTML = '<p>No jobs found matching your search.</p>';
    return;
  }
  jobsToRender.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'job-item';

    const header = document.createElement('div');
    header.className = 'job-header';
    header.innerHTML = `<span>${job.title} - ${job.company}</span><span class="toggle-icon">+</span>`;

    const details = document.createElement('div');
    details.className = 'job-details';
    details.innerHTML = `
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Type:</strong> ${job.type}</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Requirements:</strong> ${job.requirements}</p>
    `;

    const applyBtn = document.createElement('button');
    applyBtn.className = 'apply-btn';
    applyBtn.textContent = job.applied ? 'Applied' : 'Apply';
    applyBtn.disabled = job.applied;

    applyBtn.addEventListener('click', () => {
      job.applied = true;
      applyBtn.textContent = 'Applied';
      applyBtn.disabled = true;
    });

    details.appendChild(applyBtn);

    header.addEventListener('click', () => {
      const isOpen = details.classList.toggle('open');
      header.querySelector('.toggle-icon').textContent = isOpen ? '−' : '+';
    });

    jobDiv.appendChild(header);
    jobDiv.appendChild(details);
    jobsListDiv.appendChild(jobDiv);
  });
}

// Initial render of all jobs
renderJobs(jobs);

// Search input event listener to filter jobs dynamically
jobSearchInput.addEventListener('input', () => {
  const searchValue = jobSearchInput.value.trim().toLowerCase();
  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue)
    );
  });
  renderJobs(filteredJobs);
});
