const jobsListDiv = document.getElementById('jobs-list');
const jobSearchInput = document.getElementById('job-search-input');

const PAGE_SIZE = 3;
let currentPage = 1;
let filteredJobs = jobs.slice(); // copy of jobs array for search filtering

function renderJobs(jobsToRender) {
  jobsListDiv.innerHTML = '';

  if (jobsToRender.length === 0) {
    jobsListDiv.innerHTML = '<p>No jobs found matching your search.</p>';
    return;
  }
  
  // Calculate page count
  const totalPages = Math.ceil(jobsToRender.length / PAGE_SIZE);

  // Clamp current page if out of range
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Get jobs for current page
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const jobsForPage = jobsToRender.slice(startIdx, endIdx);

  // Render jobs for current page
  jobsForPage.forEach(job => {
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

  // Render pagination controls
  renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
  // Remove existing pagination controls if any
  const existingControls = document.getElementById('pagination-controls');
  if (existingControls) existingControls.remove();

  if (totalPages <= 1) return; // No need to show controls if 1 or 0 pages

  const paginationDiv = document.createElement('div');
  paginationDiv.id = 'pagination-controls';
  paginationDiv.style.marginTop = '15px';
  paginationDiv.style.textAlign = 'center';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.style.marginRight = '10px';
  prevBtn.className = 'apply-btn';
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderJobs(filteredJobs);
    }
  });

  const pageInfo = document.createElement('span');
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.style.marginLeft = '10px';
  nextBtn.className = 'apply-btn';
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderJobs(filteredJobs);
    }
  });

  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(pageInfo);
  paginationDiv.appendChild(nextBtn);

  jobsListDiv.after(paginationDiv);
}

// Search filtering with pagination reset
jobSearchInput.addEventListener('input', () => {
  const searchValue = jobSearchInput.value.trim().toLowerCase();
  filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue)
    );
  });
  currentPage = 1; // Reset to first page on search
  renderJobs(filteredJobs);
});

// Initialize rendering with all jobs on page 1
renderJobs(jobs);
