export const BASE_URL = "https://tripleten.desarrollointerno.com";

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
        throw new Error("Error en el inicio de sesión");
      });
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);  
        return data;
      } else {
        throw new Error("Token no recibido");
      }
    })
    .catch((err) => {
      console.error("Error en login:", err);
    });
};
  
  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || "Error en el registro");
        });
      }
      return response.json();
    })
    .then((data) => {
      return data; 
  })
  .catch((err) => {
      console.error(err);
      throw err; 
  });
};

  export const getUserProfile = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
        if (!response.ok) {
          throw new Error("No se pudo obtener el perfil del usuario");
        }
        return await response.json();
  };

  export const setUserInfo = async (data) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return await response.json();
  };

  export const setUserAvatar = async (data) => {
    const response = await fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return await response.json();
  };

  export const getInitialCards = async () => {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const cards = await response.json();
        // Ordenado por _id (inform de tiempo) porque con createdAt no se puede, ya que no controlo el backend
    return cards.sort((a, b) => b._id.localeCompare(a._id));
    };

  export const addPlace = async (data) => {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return await response.json();
  };
  
  export const changeLikeCardStatus = async (cardId, like) => {
    const method = like ? "PUT" : "DELETE";
    const response = await fetch(`${BASE_URL}/cards/likes/${cardId}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return await response.json();
  };

  export const deleteCard = async (cardId) => {
    const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return await response.json();
  };