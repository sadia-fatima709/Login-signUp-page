
const supabase_Url='https://kvzcrsreatymwjxdtkrq.supabase.co'
const supabase_Key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2emNyc3JlYXR5bXdqeGR0a3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTY0MzUsImV4cCI6MjA3OTk3MjQzNX0.eMWKh3RM_CiU8Xx9I5vnDEiPYr1gb4ouSdZStg2BC5M'

const {createClient} = supabase
let client = createClient(supabase_Url,supabase_Key)
console.log(createClient,client)


let loginForm = document.getElementById("loginPage");

let email = document.getElementById("exampleInputEmail");
let password = document.getElementById("exampleInputPassword");
let submit = document.getElementById("exampleInputSignIn");
async function login(e) {
  e.preventDefault();
  try {
    if (!email.value) {
      alert("plz enter your email");

      return;
    }

    if (!password.value) {
      alert("plz enter your password");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.log(error);
      return;
    } else {
      Swal.fire({
        title: "login",
        text: "congratulation , you are signed in",
        icon: "success",
      })

      location.href = "./login.html";
    }
  } catch (err) {
    console.log(err);
  }
}

loginForm && loginForm.addEventListener("submit", login);



