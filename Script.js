document.addEventListener("DOMContentLoaded", () => {
    // Menú móvil
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        this.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (menuToggle) {
          menuToggle.classList.remove("active")
          navLinks.classList.remove("active")
        }
      })
    })
  
    // Animación de scroll
    const sections = document.querySelectorAll("section")
    const navLi = document.querySelectorAll(".nav-links li")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id")
        }
      })
  
      navLi.forEach((li) => {
        li.classList.remove("active")
        if (li.querySelector("a").getAttribute("href") === `#${current}`) {
          li.classList.add("active")
        }
      })
  
      // Navbar background change on scroll
      const header = document.querySelector("header")
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 0)
      }
    })
  
    // Formulario de contacto
    const emailForm = document.getElementById("emailForm")
    if (emailForm) {
      emailForm.addEventListener("submit", function (e) {
        e.preventDefault()

        // Reemplaza 'TU_FORM_ID_DE_FORMSPREE' con el ID real de tu formulario Formspree
        const formSpreeEndpoint = "https://formspree.io/f/xgvkegqk"; 
        const formData = new FormData(this)

        fetch(formSpreeEndpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("¡Mensaje enviado con éxito!")
              emailForm.reset()
            } else {
              // Intenta obtener más detalles del error si es posible
              response.json().then(data => {
                if (data.errors) {
                  alert("Error: " + data.errors.map(error => error.message).join(", "));
                } else {
                  alert("Hubo un error al enviar el mensaje. Código: " + response.status);
                }
              }).catch(() => {
                 alert("Hubo un error al enviar el mensaje. Código: " + response.status);
              })
            }
          })
          .catch((error) => {
            alert("Hubo un error de red al enviar el mensaje.")
            console.error(error)
          })
      })
    }
  
    // Animación para las tarjetas de proyectos
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const projectLinks = this.querySelector(".project-links")
        if (projectLinks) {
          projectLinks.style.opacity = "1"
        }
      })
  
      card.addEventListener("mouseleave", function () {
        const projectLinks = this.querySelector(".project-links")
        if (projectLinks) {
          projectLinks.style.opacity = "0"
        }
      })
    })
  
    // Nueva lógica para Scroll Reveal con IntersectionObserver ---
    const revealSections = document.querySelectorAll("section");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
          
          else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        root: null, // Relativo al viewport
        rootMargin: "0px",
        threshold: 0.1, // Porcentaje de la sección visible para activar (ajusta según necesites)
      }
    );

    revealSections.forEach((section) => {
      revealObserver.observe(section);
    });
  })
