
const supabase_Url='https://kvzcrsreatymwjxdtkrq.supabase.co'
const supabase_Key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2emNyc3JlYXR5bXdqeGR0a3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTY0MzUsImV4cCI6MjA3OTk3MjQzNX0.eMWKh3RM_CiU8Xx9I5vnDEiPYr1gb4ouSdZStg2BC5M'

const {createClient} = supabase
let client = createClient(supabase_Url,supabase_Key)
console.log(createClient,client)




async function fetchPosts() {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  const container = document.getElementById('postsContainer');
  container.innerHTML = '';

  for (const post of data) {
    const imageUrl = await getImageUrl(post.image_path);
    container.innerHTML += `
      <div class="post">
        <img src="${'https:kvzcrsreatymwjxdtkrq.supabase.co/storage/v1/object/public/blog-image/nature.jpg'}" alt="${post.title}" />
        <h2>${post.title}</h2>
        <p><strong>${post.author}</strong> — ${new Date(post.date).toDateString()}</p>
        <p>${post.description}</p>
      </div>
    `;
  }
}

async function getImageUrl(path) {
  const { data, error } = await supabase.storage.from('blog-images').getPublicUrl(path);
  return data?.publicUrl || '';
}

fetchPosts();
