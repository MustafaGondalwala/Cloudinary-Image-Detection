import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("https://django-ml-backend.herokuapp.com/api/cloudinary/user/login", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("https://django-ml-backend.herokuapp.com/api/cloudinary/user/register", {user}).then(res => res.data.user),
    }
}