import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("http://ec2-3-6-67-212.ap-south-1.compute.amazonaws.com:8000/api/cloudinary/user/login", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("http://ec2-3-6-67-212.ap-south-1.compute.amazonaws.com:8000/api/cloudinary/user/register", {user}).then(res => res.data.user),
    }
}