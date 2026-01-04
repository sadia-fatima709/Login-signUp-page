const supabase = supabase.createClient('https://kvzcrsreatymwjxdtkrq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2emNyc3JlYXR5bXdqeGR0a3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTY0MzUsImV4cCI6MjA3OTk3MjQzNX0.eMWKh3RM_CiU8Xx9I5vnDEiPYr1gb4ouSdZStg2BC5M');

async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'index.html'; // redirect to login if not logged in
    return;
  }

  document.getElementById('userName').textContent = user.user_metadata?.name || 'User';
  document.getElementById('userEmail').textContent = user.email;

  loadPosts(user.id);
}

async function loadPosts(userId) {
  const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);
  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById('postsContainer');
  container.innerHTML = '';

  data.forEach(post => {
    container.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <small>${new Date(post.date).toDateString()}</small>
      </div>
    `;
  });
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
});

document.getElementById('newPostBtn').addEventListener('click', () => {
  alert('Here you would open a form to create a new post!');
});

loadUser();
