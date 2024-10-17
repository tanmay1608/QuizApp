const validateForm = (formData) => {

    const {name,email,password,address} = formData;
   
    if(!name || !email || !password || !address) return "All fields are required";

    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.trim().length < 3) 
      return "Name must be at least 3 characters long";
    if (!nameRegex.test(name.trim())) 
      return "Name should only contain letters and spaces";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
      return "Invalid email format";

    if (password.length < 8) 
      return "Password must be at least 8 characters long";

    return null;
  };

  export default validateForm;