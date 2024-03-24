import React from 'react';
import { signIn } from 'next-auth/react'



function loginPage() {
  return (
    <div id="login_1">
      <div id="login_logo">
        <img src="Logo.svg" alt="logo" />
      </div>

      <form action="login.php" method="post">
        <div id="username_things">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder=" Username" required />
        </div>

        <div id="password_things">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder=" Password" required />
        </div>

        <div id="sesion_options">
          <a href="">Forgot password?</a>
        </div>
        <button> Log in </button>
        <button onClick={() => signIn()}>Iniciar sesión con Google</button>
      </form>
    </div>
  );
}


export default loginPage;