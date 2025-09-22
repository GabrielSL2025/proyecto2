document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // 📌 REGISTRO
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const telefono = document.getElementById("telefono").value;
            const fecha = document.getElementById("fecha_nacimiento").value;
            const usuario = document.getElementById("usuario").value;
            const password = document.getElementById("passwordRegister").value;
            const confirmar = document.getElementById("confirmar_password").value;

            if (password !== confirmar) {
                alert("❌ Las contraseñas no coinciden");
                return;
            }

            // Traer usuarios ya guardados o crear un array vacío
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Verificar si el usuario ya existe
            const exists = users.some(u => u.usuario === usuario);
            if (exists) {
                alert("❌ Este usuario ya está registrado");
                return;
            }

            // Crear nuevo usuario
            const newUser = {
                nombre,
                email,
                telefono,
                fecha,
                usuario,
                password
            };

            // Agregar al array y guardar en localStorage
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("✅ Registro exitoso. Ahora puede iniciar sesión.");
            registerForm.reset();
        });
    }

    // 📌 LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const usuarioLogin = document.getElementById("loginUsuario").value;
            const passwordLogin = document.getElementById("loginPassword").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Buscar usuario en la lista
            const userFound = users.find(u => u.usuario === usuarioLogin && u.password === passwordLogin);

            if (userFound) {
                // Guardar sesión activa (opcional)
                localStorage.setItem("activeUser", JSON.stringify(userFound));

                // Redirigir a la página de perfil
                window.location.href = "perfil.html";
            } else {
                document.getElementById("error").textContent = "❌ Usuario o contraseña incorrectos.";
            }
        });
    }
});


// 📌 PERFIL (tabla de usuarios)
    if (document.getElementById("perfil")) {
        const perfilDiv = document.getElementById("perfil");
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.length > 0) {
            let table = `<table>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fecha Nacimiento</th>
                    <th>Usuario</th>
                </tr>`;

            users.forEach(u => {
                table += `
                <tr>
                    <td>${u.nombre}</td>
                    <td>${u.email}</td>
                    <td>${u.telefono}</td>
                    <td>${u.fecha}</td>
                    <td>${u.usuario}</td>
                </tr>`;
            });

            table += `</table>`;
            perfilDiv.innerHTML = table;
        } else {
            perfilDiv.innerHTML = "<p style='text-align:center;'>No hay usuarios registrados.</p>";
        }

        // Botón de cerrar sesión
        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("activeUser");
            window.location.href = "index.html";
        });
    }